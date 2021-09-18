defmodule E2QuizzicalWeb.PublicController do
  use E2QuizzicalWeb, :controller

  require Logger
  alias E2Quizzical.{Auth, Guardian, User, Repo, Mailer, Converter}
  import Ecto.Query, warn: false

  def index(conn, params) do
    case params do
      %{} ->
        render(conn, "index.html")
      non_empty_params ->
          non_empty_params
          |> Map.get("path")
          |> Enum.at(-1)
        render(conn, "index.html")
    end
  end

  def nothing(conn, _params) do
    send_resp(conn, 404, "-")
  end

  def log_out(conn, _params) do
    # todo
    json(conn, %{success: true})
  end

  def auth_check(conn, _params) do
    json(conn, %{success: !is_nil(conn.assigns.current_user)})
  end

  def log_in(conn, params = %{"username" => username, "password" => pwd}) do
    ip = conn.remote_ip 
      |> :inet.ntoa() 
      |> to_string()
    is_dev = Application.get_env(:e2quizzical, :environment) == :dev
    dev_user_id = Application.get_env(:e2quizzical, :dev_user_id)
    provided_two_factor_code = Map.get(params, "two_factor_code")

    if is_dev && !is_nil(dev_user_id) do
      Logger.warn("using development mode user id")
      user = Repo.get!(User, dev_user_id)
      sign_in_ok_response(conn, user)
    else
      do_log_in(conn, ip, username, pwd, provided_two_factor_code)
    end
  end

  defp do_log_in(conn, ip, username, pwd, provided_two_factor_code) do
    Auth.attempt_login(username, pwd)
    # |> IO.inspect(label: "result of auth attempt ==========================>")
    |> case do
      {:error, reason, message} ->
        Logger.debug("Authentication failure: #{Atom.to_string(reason)} from #{ip}")

        json(conn, %{
          success: false,
          message: if(is_nil(message), do: "Login failed!", else: message)
        })

      {:ok, user 
        # = %{ two_factor_key: two_factor_key, disable_2fa: two_factor_disabled }
      } ->
          # cond do
          #   two_factor_disabled ->
          #     sign_in_ok_response(conn, user)

          #   is_nil(provided_two_factor_code) ->
          #     if two_factor_key do
          #       json(conn, %{
          #         success: true,
          #         two_factor: true,
          #         message: "Please enter your 6 digit two factor code"
          #       })
          #     else
          #       send_2fa_code_result(conn, user, "Two factor code sent")
          #     end

          #   true ->
              # user
              # |> check_two_factor_code(provided_two_factor_code)
              # |> case do
              #   {:ok, user} ->
                  sign_in_ok_response(conn, user)

              #   {:error, error_message} ->
              #     case check_google_auth_code(user, provided_two_factor_code) do
              #       {:ok, user} ->
              #         sign_in_ok_response(conn, user)

              #       {:error, auth_error_message} ->
              #         message =
              #           case is_nil(auth_error_message) do
              #             true -> error_message
              #             false -> auth_error_message
              #           end

              #         json(conn, %{success: false, message: message})
              #     end
              # end
          # end
      end    
  end

  def set_password(conn, %{"token" => token, "password" => pwd}) do
    token
    |> User.get_user_by_reset_token()
    |> case do
      nil ->
        json(conn, %{success: false, message: "This reset token cannot be found."})

      user ->
        diff = DateTime.diff(Converter.now(), user.reset_password_requested_at)
        # one hour
        if diff > 3600 do
          json(conn, %{success: false, message: "This link has expired. Please request a new one."})
        else 
            user
            |> User.reset_password_changeset(%{ password: pwd})
            |> Repo.update!()
            json(conn, %{success: true})
        end
    end
  end

  def forgot_password(conn, %{"username" => username}) do
    username
    |> User.get_user_by_username()
    |> case do
      nil ->
        json(conn, %{success: false, message: "#{username} cannot be found."})

      user ->
        changes = user
        |> User.forgot_password_changeset()
        |> Repo.update!()

        Mailer.password_reset_email(user.email, changes.reset_password_token, user.first_name)
        json(conn, %{success: true})
    end
  end

  def resend_code(conn, %{"username" => username}) do
    username
    |> User.get_user_by_username()
    |> case do
      nil ->
        message = "Error sending code, #{username} can not be found."
        Logger.error(message)
        json(conn, %{success: false, message: message})
      user ->
        send_2fa_code_result(conn, user, "Two factor code sent")
    end
  end

  def check_google_auth_code(user, code) do
    cond do
      is_nil(user.encrypted_otp_secret_key_iv) ->
        {:error, nil}

      is_nil(user.encrypted_otp_secret_key_salt) ->
        {:error, nil}

      true ->
        salt = Base.decode32!(user.encrypted_otp_secret_key_salt)

        encrypted_password = Base.decode32!(user.encrypted_otp_secret_key_iv)

        decrypted_code =
          :pot.totp(
            :crypto.block_decrypt(
              :aes_cbc128,
              salt,
              salt,
              encrypted_password
            )
          )

        if decrypted_code == code do
          user
          |> User.changeset(%{
            two_factor_key: nil,
            failed_attempt_count: 0,
            last_login: DateTime.utc_now()
          })
          |> Repo.update()
        else
          {:error, "Invalid code."}
        end
    end
  end

  defp send_2fa_code_result(conn, user, message) do
    user
    |> Auth.send_two_factor_code()
    |> case do
      {:ok, _} ->
        json(conn, %{success: true, message: message, two_factor: true})

      :ok ->
        json(conn, %{success: true, message: message, two_factor: true})

      {:error, error_message, _status_code} ->
        Logger.error("failed to send 2fa: #{inspect error_message}")
        json(conn, %{success: false, message: "Error Sending Code, #{inspect error_message}"})

      {:error, error_message} ->
        Logger.warn("Error Sending Code, #{inspect error_message}")
        json(conn, %{success: false, message: "Error Sending Code, #{inspect error_message}"})
    end
  end

  defp check_two_factor_code(user, code) do
    user_code = 
      if is_nil(user.two_factor_key) do
        ""
      else
        user.two_factor_key
      end

    expired =
      Timex.compare(
        Timex.shift(user.two_factor_key_created_at,
          minutes: Application.get_env(:e2quizzical, :two_factor_expiry_minutes)
        ),
        Timex.now(user.timezone)
      )
      |> case do
        -1 -> true
        _ -> false
      end

    cond do
      expired ->
        {:error, "Your code has expired. Please request a new one."}

      code != user_code ->
        {:error, "Invalid code."}

      true ->
        user
        |> User.changeset(%{
          two_factor_key: nil,
          failed_attempt_count: 0,
          last_login: DateTime.utc_now()
        })
        |> Repo.update()
    end
  end

  defp sign_in_ok_response(conn, user) do
    user
    |> User.clear_failed_login_attempts()
    |> User.set_last_login()

    user_info = User.get_one(user.id)
    IO.puts "==============================================> user info is #{inspect(user_info)}"
    # {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user_info, %{some: "claim"}, token_type: "refresh", ttl: {12, :hours})
    {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user_info)
    IO.puts("jwt is #{jwt}")
    json(conn, %{
      success: true,
      token: jwt, 
      user: user_info,
      message: ""
    })
  end
end
