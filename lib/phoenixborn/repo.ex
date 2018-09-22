defmodule Phoenixborn.Repo do
  use Ecto.Repo,
    otp_app: :phoenixborn,
    adapter: Ecto.Adapters.Postgres
end
