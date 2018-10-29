alias Phoenixborn.Accounts
alias PhoenixbornWeb.ErrorHelpers
alias PhoenixbornWeb.Auth

defmodule PhoenixbornWeb.ApiController do
  use PhoenixbornWeb, :controller

  @card_data Path.join(:code.priv_dir(:phoenixborn), "cards.json")
             |> File.read!()

  def cards(conn, _params) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(:ok, @card_data)
  end

  def login(conn, %{"username" => username, "password" => pass}) do
    case Accounts.authenticate_by_username_and_pass(username, pass) do
      {:ok, user} ->
        conn
        |> Auth.login(user)
        |> json(%{
          token: Phoenix.Token.sign(conn, "the price of salt", user.id)
        })

      {:error, _reason} ->
        conn
        |> put_status(:forbidden)
        |> text("Forbidden")
    end
  end

  def create_user(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:ok)
        |> json(%{token: Phoenix.Token.sign(conn, "the price of salt", user.id)})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(ErrorHelpers.changeset_error(changeset))
    end
  end

  defp authenticate(conn, _opts) do
    if conn.assigns.current_user do
      conn
    else
      conn
      |> put_status(:forbidden)
      |> text("Forbidden")
      |> halt
    end
  end

  plug(:authenticate when action in [:create_decklist])

  def create_decklist(conn, %{"decklist" => decklist}) do
  end
end
