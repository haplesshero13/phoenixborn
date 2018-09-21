defmodule PhoenixbornWeb.Router do
  use PhoenixbornWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", PhoenixbornWeb do
    pipe_through(:browser)

    get("/api/cards", ApiController, :cards)
    get("/", PageController, :index)
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixbornWeb do
  #   pipe_through :api
  # end
end
