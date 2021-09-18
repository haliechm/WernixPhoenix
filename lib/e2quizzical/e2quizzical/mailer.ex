defmodule E2Quizzical.Mailer do
  require Logger
  import Bamboo.Email
  require EEx
  use Bamboo.Phoenix, view: E2QuizzicalWeb.EmailView
  use Bamboo.Mailer, otp_app: :e2quizzical

  def system_email do
    new_email()
    |> from(Application.get_env(:e2quizzical, :send_email_from))
  end

  def test_email(user, message) do
    assigns = [user: user, message: message]
    system_email()
    |> to(user.email)
    |> system_name_subject("Test Email")
    |> render_text_view("test.text", assigns)
    |> render_html_view("test.html", assigns)
  end

  def password_reset_email(email_address, reset_token, name) do
    reset_link = "#{Application.get_env(:e2quizzical, :app_root_url)}/reset_password/"
    app_name = Application.get_env(:e2quizzical, :app_name)
    assigns = [
      name: name,
      email: email_address,
      reset_password_link: reset_link <> reset_token,
      subject: "#{app_name} Login Password Reset"
    ]
    system_email()
    |> to(email_address)
    |> system_name_subject("Password Reset Requested")
    |> html_body(EEx.eval_file(Path.join(get_root_email_template_path(), "reset_password.html.eex"), assigns))
    |> deliver_now()
    |> case do
      %Bamboo.Email{} -> {:ok, email_address}
      %Bamboo.ApiError{} -> {:error, email_address}
      _ -> {:error, email_address}
    end
  end

  def send_two_factor_code_email(code, name, email_address, timestamp, later_timestamp) do
    date_format = "{0D}-{Mshort}-{YY} {0h12}:{m}:{s} {AM}"
    app_name = Application.get_env(:e2quizzical, :app_name)
    subject = "Login Security Code"
    assigns = [
      code: code,
      subject: subject,
      name: name,
      timestamp: Timex.format!(timestamp, date_format),
      later_timestamp: Timex.format!(later_timestamp, date_format)
    ]

    system_email()
    |> to(email_address)
    |> system_name_subject(subject)
    |> render_eex("two_fa.html.eex", assigns)
    |> deliver_now()
    |> case do
      %Bamboo.Email{} -> {:ok, email_address}
      %Bamboo.ApiError{} -> {:error, email_address}
      _ -> {:error, email_address}
    end
  end

  def email_confirmation_email(user, url) do
    assigns = [user: user, url: url, app_name: get_app_name()]
    system_email()
    |> to(user.email)
    |> system_name_subject("Account Confirmation")
    |> render_text_view("email_confirmation.text", assigns)
    |> render_html_view("email_confirmation.html", assigns)
  end

  def email_is_valid?(email) do
    Regex.match?(~r/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, email)
  end

  defp get_app_name(), do: Application.get_env(:e2quizzical, :app_name)

  defp system_name_subject(email, email_subject) do
    email
    |> subject("#{get_app_name()}: #{email_subject}")
  end

  defp get_root_email_template_path() do
    :e2quizzical
    |> :code.priv_dir()
    |> Path.join("email_templates")
  end

  defp render_eex(email, template_name, assigns) do
    content = get_root_email_template_path()
    |> Path.join(template_name)
    |> EEx.eval_file(assigns)

    html_body(email, content)
  end

  defp render_text_view(email, text_view, assigns) do
    email
    |> put_text_layout({E2QuizzicalWeb.LayoutView, "email.text"})
    |> render(text_view, assigns)
  end

  defp render_html_view(email, html_view, assigns) do
    email
    |> put_html_layout({E2QuizzicalWeb.LayoutView, "email.html"})
    |> render(html_view, assigns)
  end
end
