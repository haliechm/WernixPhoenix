defmodule E2Quizzical.Repo do
  use Ecto.Repo,
    otp_app: :e2quizzical,
    adapter: Ecto.Adapters.Postgres,
    show_sensitive_data_on_connection_error: Mix.env() == :dev
    use Scrivener, page_size: 15, max_page_size: 100

    def init(_, opts) do
      {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
    end
end
