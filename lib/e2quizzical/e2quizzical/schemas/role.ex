defmodule E2Quizzical.Role do
  use Ecto.Schema
  import Ecto.Query

@primary_key {:id, :integer, []}
@derive {Phoenix.Param, key: :id}

@system_admin_id 1
# @dock_supervisor_id 2
@read_only_id 3

@system_admin_name "System Admin"
# @dock_supervisor_name "Dock Supervisor"
@read_only_name "Read Only"

  schema "roles" do
    field :name, :string
    has_many :user_roles, E2Quizzical.UserRole, on_delete: :delete_all
  end

  def system_admin(), do: @system_admin_id
#  def dock_supervisor(), do: @dock_supervisor_id
  def read_only(), do: @read_only_id

  def system_admin_name(), do: @system_admin_name
#  def dock_supervisor_name(), do: @dock_supervisor_name
  def read_only_name(), do: @read_only_name

  defp base_query do
    (from r in E2Quizzical.Role)
  end

  def query_builder(params) do
    base_query()
    |> id_filter(params)
    |> name_filter(params)
  end

  defp id_filter(query, %{"id" => id}) do
    query
    |> where([x], x.id == ^id)
  end
  defp id_filter(query, _), do: query

  defp name_filter(query, %{"name" => name}) do
    query
    |> where([x], x.name == ^name)
  end
  defp name_filter(query, _), do: query
end