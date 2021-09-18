defmodule E2Quizzical.EnsureAdmin do
  require Logger
  import Plug.Conn
 
  @doc false
  def init(opts) do
    opts = Enum.into(opts, %{})
    handler = build_handler_tuple(opts)
 
    Map.drop(opts, [:on_failure, :key, :handler])
    %{
      handler: handler
    }
  end
 
  @doc false
  def call(conn, opts) do
    user = Guardian.Plug.current_resource(conn)
    if is_nil(user) do
      handle_error(conn, {:error, "user is not authenticated"}, opts)
    else
      if user.is_admin do
        conn
      else
        conn
        |> handle_error({:error, "user is not an administrator"}, opts)
      end
    end
  end
 
  defp handle_error(%Plug.Conn{params: params} = conn, reason, opts) do
    conn = conn |> assign(:guardian_failure, reason) |> halt
    params = Map.merge(params, %{reason: reason})
    {mod, meth} = Map.get(opts, :handler)
 
    apply(mod, meth, [conn, params])
  end
 
  defp build_handler_tuple(%{handler: mod}) do
    {mod, :unauthorized}
  end

  defp build_handler_tuple(%{on_failure: {mod, fun}}) do
    _ = Logger.warn(":on_failure is deprecated. Use the :handler option instead")
    {mod, fun}
  end

  defp build_handler_tuple(_) do
    {Guardian.Plug.ErrorHandler, :unauthorized}
  end
end