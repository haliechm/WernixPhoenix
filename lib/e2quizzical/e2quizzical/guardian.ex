defmodule E2Quizzical.Guardian do
  use Guardian, otp_app: :e2quizzical

  alias E2Quizzical.User

  def subject_for_token(user, _claims), do: {:ok, to_string(user.id)}

  def resource_from_claims(_claims = %{"sub" => user_id}) do
  	user_id
  	|> User.get_one()
  	|> case do
  		nil ->
  			{:error, :resource_not_found}
  		user ->
  			{:ok, user}
  	end
  end
end