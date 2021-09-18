defmodule E2QuizzicalWeb.DockChannel do
  use Phoenix.Channel

  def join("dock:" <> _dock_id, _message, socket) do
    {:ok, socket}
  end

  # def handle_in("update_message", %{"message" => message, "updatedDock" => updatedDock, "user_id" => user_id}, socket) do
  #   broadcast!(socket, "update_message", %{message: message, updatedDock: updatedDock, user_id: user_id})
  #   {:noreply, socket}
  # end
end