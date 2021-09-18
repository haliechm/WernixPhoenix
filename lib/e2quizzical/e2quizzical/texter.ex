defmodule E2Quizzical.Texter do
  def send_sms(%{phone_number: number, text_message: message}) do
    config_overrides = %{
      access_key_id: Application.get_env(:ex_aws, :access_key_id),
      secret_access_key: Application.get_env(:ex_aws, :secret_access_key)
    }
    try do
      if is_nil(number) || number == "" do
        {:error, "No number for this user"}
        else

        # results =
        %ExAws.Operation.Query{
          action: "publish",
          params: %{
            "Action" => "Publish",
            "PhoneNumber" => "#{scrub(number)}",
            "Message" => message
          },
          service: :sns
        }
        |> ExAws.request(config_overrides)
      end
    rescue
      e -> {:error, "Unknown error in texter: #{inspect(e)}"}
    end
  end

  #phone-number-format required 13361231234
  defp scrub(number) do
    number
    |> String.trim()
    |> String.replace("-", "")
    <<first_digit::bytes-size(1)>> <> _rest = number
    number = if first_digit == "1" do
      number
    else
      "1#{number}"
    end
    "+#{number}"
  end
end
