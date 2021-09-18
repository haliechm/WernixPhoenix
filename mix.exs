defmodule E2Quizzical.MixProject do
  use Mix.Project

  def project do
    [
      app: :e2quizzical,
      version: "0.1.0",
      elixir: "~> 1.9",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {E2Quizzical.Application, []},
      extra_applications: [:logger, :runtime_tools, :gen_smtp,
        :bamboo, :bamboo_smtp, :phoenix_ecto, :comeonin, :timex, :guardian, :quantum, :telemetry]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.5.5"},
      {:phoenix_ecto, "~> 4.1"},
      {:ecto_sql, "~> 3.4"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.11"},
      {:phoenix_live_reload, "~> 1.2.1", only: :dev},
      {:phoenix_live_view, ">= 0.14.3"},
      {:phoenix_live_dashboard, "~> 0.2"},
      {:telemetry_metrics, "~> 0.4"},
      {:telemetry_poller, "~> 0.4"},
      {:floki, ">= 0.0.0", only: :test},
      {:gettext, "~> 0.14"},
      {:jason, "~> 1.0"},
      {:plug_cowboy, "~> 2.1"},
      {:cowboy, "~> 2.9"},
      #{:cowboy, "< 2.8.0", override: true},
      {:plug, "> 1.8.3"},
      {:plug_static_index_html, "~> 1.0"},
      {:cors_plug, "~> 1.5"},
      {:scrivener_ecto, "~> 2.2"},
      {:distillery, "~> 2.1"},
      {:password_validator, "~> 0.3"},
      {:pot, "~> 1.0.0"},
      {:logger_file_backend, "0.0.11"},
      {:nimble_csv, "~> 0.6.0"},
      {:guardian, "~> 2.1"},
      {:guardian_phoenix, "~> 2.0"},
      {:csv, "~> 2.3"},
      {:tzdata, "~> 1.0.2"},
      {:timex, "~> 3.6.1"},
      {:bamboo, "~> 1.3"},
      {:bamboo_smtp, "~> 2.1.0"},
      {:httpoison, "~> 1.6.2"},
      {:poison, ">= 4.0.0", override: true},
      {:comeonin, ">= 5.3.0"},
      {:pbkdf2_elixir, "~> 1.0"},
      {:elixir_uuid, "~> 1.2.1"},
      {:money, "~> 1.6.1"},
      {:quantum, "~> 2.3"},
      {:arc, "~> 0.11.0"},
      {:ex_aws, "~> 2.0"},
      {:ex_aws_s3, "~> 2.0"},
      {:arc_ecto, "~> 0.11.1"},
      {:sweet_xml, "~> 0.6"},
      {:ex_twilio, ">= 0.8.1"},
      {:cachex, ">= 3.3.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup", "cmd npm install --prefix assets"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"]
    ]
  end
end
