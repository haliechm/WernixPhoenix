defmodule E2Quizzical.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :e2quizzical,
    error_handler: E2Quizzical.GuardianErrorHandler,
    module: E2Quizzical.Guardian

  # If there is a session token, restrict it to an access token and validate it
  plug Guardian.Plug.VerifySession, claims: %{"typ" => "access"}
  # If there is an authorization header, restrict it to an access token and validate it
  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}
  # Load the user if either of the verifications worked
  plug Guardian.Plug.LoadResource, allow_blank: true

  plug :assign_current_identity

  defp assign_current_identity(conn, _) do
    conn
    |> assign(:current_user, Guardian.Plug.current_resource(conn))
  end
end