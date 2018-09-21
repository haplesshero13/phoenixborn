defmodule PhoenixbornWeb.ApiController do
  use PhoenixbornWeb, :controller

  @card_data Path.join(:code.priv_dir(:phoenixborn), "cards.json")
             |> File.read!()

  def cards(conn, _params) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(:ok, @card_data)
  end
end
