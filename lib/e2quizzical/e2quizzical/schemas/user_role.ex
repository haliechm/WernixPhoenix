defmodule E2Quizzical.UserRole do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false

  alias E2Quizzical.{
    Repo, UserRole, Converter
  }

  @timestamps_opts [type: :utc_datetime]
  schema "user_roles" do
    belongs_to(:user, E2Quizzical.User)
    belongs_to(:role, E2Quizzical.Role)
    belongs_to(:created_by_user, E2Quizzical.User)
    field(:deactivated_at, :utc_datetime)
    belongs_to(:deactivated_by_user, E2Quizzical.User)
    timestamps()
  end

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:user_id, :role_id, :created_by_user_id, :deactivated_at, :deactivated_by_user_id])
  end

  def set_roles(user_id, new_role_id_list, by_user_id) do
    old_list = UserRole
      |> where([x], x.user_id == ^user_id and is_nil(x.deactivated_at))
      |> Repo.all()

    # removed
    old_list
    |> Enum.filter(fn %{role_id: role_id} -> !Enum.member?(new_role_id_list, role_id) end)
    |> Enum.each(fn o ->
      o
      |> Ecto.Changeset.change()
      |> put_change(:deactivated_at, Converter.now)
      |> put_change(:deactivated_by_user_id, by_user_id)
      |> Repo.update!()
    end)

    #added
    new_role_id_list
    |> Enum.filter(fn role_id -> !Enum.any?(old_list, fn %{role_id: old_role_id} -> old_role_id == role_id end) end)
    |> Enum.each(fn role_id ->
      %UserRole{
        created_by_user_id: by_user_id,
        user_id: user_id,
        role_id: role_id
      }
      |> changeset()
      |> Repo.insert!()
    end)
  end
end
