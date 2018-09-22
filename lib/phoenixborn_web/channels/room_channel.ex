alias Phoenixborn.Accounts

defmodule PhoenixbornWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_msg", %{"body" => body, "token" => token}, socket) do
    case Phoenix.Token.verify(socket, "the price of salt", token, max_age: 1_209_600) do
      {:ok, user_id} ->
        case Accounts.get_user!(user_id) do
          user = %Accounts.User{} ->
            broadcast!(socket, "new_msg", %{body: "#{user.username}: #{body}"})
            {:noreply, socket}

          _error ->
            {:reply, {:error, %{error: "Unauthorized"}}, socket}
        end

      {:error, _} ->
        {:reply, {:error, %{error: "Unauthorized"}}, socket}
    end
  end
end
