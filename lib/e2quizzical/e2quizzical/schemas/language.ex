defmodule E2Quizzical.Language do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false

#   alias E2Quizzical.{
#     Repo, Language, Converter
#   }

  @timestamps_opts [type: :utc_datetime]
  schema "languages" do
    field :name, :string
    timestamps()
  end

  @available_fields ~w(name)a
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields)
    |> unique_constraint(:name, message: "Language already exists.")
  end

 

#   def set_roles(user_id, new_role_id_list, by_user_id) do
#     old_list = UserRole
#       |> where([x], x.user_id == ^user_id and is_nil(x.deactivated_at))
#       |> Repo.all()

#     # removed
#     old_list
#     |> Enum.filter(fn %{role_id: role_id} -> !Enum.member?(new_role_id_list, role_id) end)
#     |> Enum.each(fn o ->
#       o
#       |> Ecto.Changeset.change()
#       |> put_change(:deactivated_at, Converter.now)
#       |> put_change(:deactivated_by_user_id, by_user_id)
#       |> Repo.update!()
#     end)

#     #added
#     new_role_id_list
#     |> Enum.filter(fn role_id -> !Enum.any?(old_list, fn %{role_id: old_role_id} -> old_role_id == role_id end) end)
#     |> Enum.each(fn role_id ->
#       %UserRole{
#         created_by_user_id: by_user_id,
#         user_id: user_id,
#         role_id: role_id
#       }
#       |> changeset()
#       |> Repo.insert!()
#     end)
#   end
end
