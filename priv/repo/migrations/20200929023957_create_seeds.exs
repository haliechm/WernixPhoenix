defmodule E2Quizzical.Repo.Migrations.CreateSeeds do
  use Ecto.Migration
    alias E2Quizzical.{
      Repo,
      User,
      Role,
      UserRole
    }

  def up do
    sys_admin_role = Repo.insert!(%Role{id: 1, name: "System Admin"})
    Repo.insert!(%Role{id: 2, name: "Supervisor"})
    Repo.insert!(%Role{id: 3, name: "Read Only"})

    IO.puts "added application roles"

    {:ok, user} = %User{
        first_name: "John",
        middle_name: "",
        last_name: "Smith",
        email: "ali@sightsource.net",
        username: "john",
        timezone: "America/New_York"
      }
      |> Repo.insert()
    UserRole.set_roles(user.id, [sys_admin_role.id], user.id)

    IO.puts "created seed user account"

    user
    |> User.change_password_changeset(%{password: "Password1"})
    |> Repo.update!()

    IO.puts "changed seed user password"
  end

  def down do
    # presumably undoing this will be coupled with dropping tables in the next couple of downs so not wasting the time...
  end
end
