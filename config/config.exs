# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :e2quizzical,
  namespace: E2Quizzical,
  ecto_repos: [E2Quizzical.Repo],
  failed_attempt_threshold: 4,
  failed_attempt_recovery_minutes: 5,
  send_email_from: "info@e2quizzical.com",
  default_timezone: "America/New_York",
  env: Mix.env()

default_secret_key_base = "someSUUUPERsecretkeythatmustbe replacedOnTherealServer"

# Configures the endpoint
config :e2quizzical, E2QuizzicalWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: E2QuizzicalWeb.ErrorView, accepts: ~w(html json), layout: false],
  secret_key_base: default_secret_key_base,
  pubsub_server: E2Quizzical.PubSub

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :money,
  default_currency: :USD,
  separator: ",",
  delimeter: ".",
  symbol: true,
  symbol_on_right: false,
  symbol_space: false

config :e2quizzical, E2Quizzical.Mailer, adapter: Bamboo.LocalAdapter

config :e2quizzical, E2Quizzical.Guardian,
  issuer: "e2quizzical",
  secret_key: default_secret_key_base
  # ttl: { 30, :days }
  # live_view: [signing_salt: "Spvfr6kE"]


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
