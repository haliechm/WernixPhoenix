use Mix.Config

config :e2quizzical,
  signing_salt: "9pkVOMEpT9yw4nc01sKaxa9Iomt3Nf0nqoPVgR1r7kKFmQ"

config :e2quizzical, E2Quizzical.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_USERNAME"),
  password: System.get_env("DB_PASSWORD"),
  database: "tcw",
  hostname: "localhost",
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10")

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :e2quizzical, E2QuizzicalWeb.Endpoint,
  http: [
    port: String.to_integer(System.get_env("PORT") || "4000"),
    transport_options: [socket_opts: [:inet6]]
  ],
  secret_key_base: secret_key_base,
  live_view: [signing_salt: "FjdKE96puoAA4QQh"]

config :e2quizzical, E2Quizzical.Guardian,
  issuer: "e2quizzical",
  secret_key: secret_key_base
  # ttl: { 30, :days }
  # live_view: [signing_salt: "Spvfr6kE"]

config :e2quizzical, E2Quizzical.WebSocketsKey, System.get_env("WEB_SOCKETS_KEY")

config :ex_aws,
  access_key_id: [System.get_env("AWS_KEY_ID"), :instance_role],
  secret_access_key: [System.get_env("AWS_ACCESS_KEY"), :instance_role]

# ## Using releases (Elixir v1.9+)
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
config :e2quizzical, E2QuizzicalWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.
