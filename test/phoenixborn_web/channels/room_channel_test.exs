defmodule PhoenixbornWeb.Room1ChannelTest do
  import Mox
  use PhoenixbornWeb.ChannelCase

  setup do
    verify_on_exit!
    {:ok, _, socket} =
      socket(PhoenixbornWeb.UserSocket, "user_id", %{some: :assign})
      |> subscribe_and_join(PhoenixbornWeb.Room1Channel, "room:lobby")

    {:ok, socket: socket}
  end

  describe "handle_in" do
    describe "when logged in" do
      test "new_msg broadcasts to room:lobby", %{socket: socket} do
        Phoenixborn.AccountsMock
        |> e

        push socket, "new_msg", %{"body" => "all",  "token" => "my token"}
        assert_broadcast "new_msg", %{"body" => "all"}
      end
    end
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{"hello" => "there"}
    assert_reply ref, :ok, %{"hello" => "there"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"some" => "data"}
    assert_push "broadcast", %{"some" => "data"}
  end
end
