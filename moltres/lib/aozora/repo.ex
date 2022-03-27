defmodule Aozora.Repo do
  use Ecto.Repo,
    otp_app: :aozora,
    adapter: Ecto.Adapters.Postgres
end
