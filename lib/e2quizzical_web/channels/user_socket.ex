defmodule E2QuizzicalWeb.UserSocket do
  use Phoenix.Socket
  require Logger

  ## Channels
  # channel("dock:*", E2QuizzicalWeb.DockChannel)

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  @impl true
  def connect(%{"guardian_token" => jwt}, socket, _connect_info) do
    case Guardian.Phoenix.Socket.authenticate(socket, E2Quizzical.Guardian, jwt) do
      {:ok, authed_socket} ->
        {:ok, authed_socket}

      {:error, :token_expired} ->
        :error

      {:error, reason} ->
        Logger.warn("user client socket connect error jwt=[#{jwt}]: [#{inspect(reason)}]")

        :error
      other ->
        Logger.warn("unknown socket error: [#{inspect(other)}]")
    end
  end

  @impl true
  def connect(_params, socket, _connect_info) do
    {:ok, socket}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     E2QuizzicalWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  @impl true
  def id(_socket), do: nil
end
