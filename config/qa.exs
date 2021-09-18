use Mix.Config

config :e2quizzical, E2QuizzicalWeb.Endpoint,
  url: [host: "app-qa.sightsource.net", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json"

config :e2quizzical,
  send_email_from: "ali@sightsource.net",
  app_root_url: "https://app-qa.sightsource.net",
  app_name: "App Name (QA)",
  environment: :qa,
  signing_salt: "9pkVOMEpT9yw4nc01sKaxa9Iomt3Nf0nqoPVgR1r7kKFmQ"

# Do not print debug messages in production
config :logger, level: :info

config :arc,
  storage: Arc.Storage.S3,
  bucket: "e2quizzicaldocumentsqa"

config :ex_aws,
  access_key_id: [{:system, "AWS_ACCESS_KEY_ID"}, :instance_role],
  secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, :instance_role]

#email
config :e2quizzical, E2Quizzical.Mailer,
  adapter: Bamboo.SMTPAdapter,
  server: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  username: [{:system, "AWS_SES_USERNAME"}, :instance_role],
  password: [{:system, "AWS_SES_PASSWORD"}, :instance_role],
  tls: :always,
  # auth: :always,
  # ssl: false,
  retries: 1

config :logger,
  level: :warn,
  format: "$date $time [$level] $message\n",
  backends: [{LoggerFileBackend, :file_log}, :console]

config :logger, :file_log,
  path: "/var/log/tcw/tcw_qa.log",
  format: "$date $time [$level] $message\n",
  level: :warn

config :e2quizzical, E2Quizzical.Scheduler,
jobs: [
  # every 2 minutes
  # {"*/2 * * *", {E2Quizzical.DockStatus, :assess_dock_threshold_alerts, []}}
]

config :e2quizzical, E2Quizzical.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_USERNAME"),
  password: System.get_env("DB_PASSWORD"),
  database: "tcw_qa",
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
    port: 8001, # String.to_integer(System.get_env("PORT")),
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

config :e2quizzical, E2QuizzicalWeb.Endpoint, server: true
