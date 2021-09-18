defmodule E2Quizzical.Auth do
  use E2QuizzicalWeb, :controller
  alias E2Quizzical.{Converter, User, Repo, Mailer, Texter, User}
  import Ecto.Query, warn: false
  require Logger

  def attempt_login(username, plain_text_password) do
    user = User.get_user_by_username(username)
    wait_minutes = Application.get_env(:e2quizzical, :failed_attempt_recovery_minutes)
    cond do
      is_nil(user) ->
        {:error, :not_found, "Invalid username/password combination"}

      !is_nil(user.deactivated_at) ->
        {:error, :account_deactivated,
         "This account has been deactivated. Please contact your system administrator."}

      !is_nil(user.last_locked_out_at) &&
          Converter.less_than_x_minutes_ago(user.last_locked_out_at, wait_minutes) ->
        {:error, :locked_out,
         "This account is currently locked out. Please either wait #{wait_minutes} minutes to try again or use the forgot password link."}

      Pbkdf2.verify_pass(plain_text_password, user.encrypted_password) ->
        if !is_nil(user.last_locked_out_at) do
          User.unlock(user)
        end
        {:ok, user}

      true ->
        threshold = Application.get_env(:e2quizzical, :failed_attempt_threshold)
        _message = User.increment_failed_logon_attempt(user, threshold)
        {:error, :unauthorized, "Invalid password"}
    end
  end

  def send_two_factor_code(user) do
    key = Enum.map(1..6, fn _x -> :rand.uniform(9) end)
      |> Enum.join()
    timestamp = Timex.now(user.timezone)
    later_timestamp = timestamp
      |> Timex.shift(minutes: 5)

    later_timestamp_string = later_timestamp
      |> Converter.to_display_format()

    user
    |> User.changeset(%{
      "two_factor_key" => key,
      "two_factor_key_created_at" => timestamp
    })
    |> Repo.update()
    |> case do
      {:ok, %{id: id, mobile_number: phone_number, email: email, first_name: first_name}} ->
        cond do
          !is_nil(phone_number) && String.length(phone_number) > 9 ->
            Texter.send_sms(%{
              phone_number: phone_number, 
              text_message: "Hi #{first_name}, your E2Quizzical login security code is #{key} - this code expires at #{later_timestamp_string}"
            })

          !is_nil(email) ->
            Mailer.send_two_factor_code_email(
              key,
              first_name,
              email,
              timestamp,
              later_timestamp
            )

          true ->
            Logger.error(
              "Unable to send 2fa code to user id #{id} - no valid email or phone number"
            )
        end

      {:error, error_message} ->
        {:error, error_message}
    end
  end

  def forbidden_response(conn) do
    with %Plug.Conn{
            path_info: path_info,
            private: %{
              :guardian_default_resource => %User{id: id}
            }
          } <- conn do
      Logger.error(
        "Forbidden access attempt for logged in user: #{id} at #{inspect(path_info)}"
      )
    else
      _ -> Logger.debug(inspect(conn, pretty: true))
    end

    conn
    |> Plug.Conn.send_resp(403, "unauthorized")
    |> Plug.Conn.halt()
  end

  def current_user(conn) do
    E2Quizzical.Guardian.Plug.current_resource(conn)
  end
  
  def get_user_roles(user) do
    user.roles
    |> List.flatten()
    |> Enum.uniq()
    |> Enum.sort()
  end

  def has_role(conn, roles) do
    conn |> has_any_roles([roles])
  end

  def has_any_roles(conn, roles) do
    conn
    |> current_user()
    |> get_user_roles()
    |> Enum.any?(fn x -> roles |> Enum.member?(x) end)
  end

  def validate_role(conn, role), do: validate_roles(conn, [role])

  def validate_roles(conn, role_list) do
    with false <- has_any_roles(conn, role_list) do
      with %Plug.Conn{
             path_info: path_info,
             private: %{
               :guardian_default_resource => %User{id: id}
             }
           } <- conn do
        Logger.error(
          "Forbidden access attempt for logged in user: #{id} at #{inspect(path_info)} restricted by role_list #{
            inspect(role_list)
          }"
        )
      else
        _ -> Logger.debug(inspect(conn, pretty: true))
      end


      conn
      |> send_resp(403, "unauthorized")
      |> halt()
    else
      _ -> true
    end
  end
end
