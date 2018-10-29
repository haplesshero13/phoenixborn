defmodule PhoenixbornWeb.Router do
  use PhoenixbornWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(PhoenixbornWeb.Auth)
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug(:fetch_session)
    plug(PhoenixbornWeb.Auth)
  end

  scope "/", PhoenixbornWeb do
    pipe_through(:browser)

    get("/", PageController, :index)
  end

  scope "/api", PhoenixbornWeb do
    pipe_through(:api)

    post("/login", ApiController, :login)
    get("/cards", ApiController, :cards)
    post("/users", ApiController, :create_user)
  end
end
