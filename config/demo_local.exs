use Mix.Config

config :e2quizzical,
  app_name: "App Name (dev)",
  environment: :dev,
  dev_user_id: 1,
  signing_salt: "SALT GOES HERE"

config :e2quizzical, E2QuizzicalWeb.Endpoint,
  secret_key_base: "SECRET GOES HERE",
  live_view: [signing_salt: "SALT GOES HERE"]

config :e2quizzical, E2Quizzical.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "USERNAME GOES HERE",
  password: "USERNAME GOES HERE",
  database: "tcw_dev",
  hostname: "localhost",
  pool_size: 10

config :e2quizzical, E2Quizzical.Guardian,
  issuer: "e2quizzical",
  secret_key: "SALT GOES HERE"

config :e2quizzical,
  E2Quizzical.WebSocketsKey,
  "SALT GOES HERE"
