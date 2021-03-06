use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :phoenixborn, PhoenixbornWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :phoenixborn, Phoenixborn.Repo,
  username: "postgres",
  password: "postgres",
  database: "phoenixborn_test",
  hostname: "localhost",
  pool_size: 10
