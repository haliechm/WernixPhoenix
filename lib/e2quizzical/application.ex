defmodule E2Quizzical.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      E2Quizzical.Repo,
      # Start the Telemetry supervisor
      E2QuizzicalWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: E2Quizzical.PubSub},
      # Start the Endpoint (http/https)
      E2QuizzicalWeb.Endpoint,
      # Start a worker by calling: E2Quizzical.Worker.start_link(arg)
      # {E2Quizzical.Worker, arg}
      {E2Quizzical.Scheduler, []}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: E2Quizzical.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    E2QuizzicalWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
