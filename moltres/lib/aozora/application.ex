defmodule Aozora.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Aozora.Repo,
      # Start the Telemetry supervisor
      AozoraWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Aozora.PubSub},
      # Start the Endpoint (http/https)
      AozoraWeb.Endpoint
      # Start a worker by calling: Aozora.Worker.start_link(arg)
      # {Aozora.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Aozora.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    AozoraWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
