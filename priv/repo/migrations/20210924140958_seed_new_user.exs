defmodule E2Quizzical.Repo.Migrations.SeedNewUser do
  use Ecto.Migration

  def change do


    # {:ok, user} = %E2Quizzical.User{
    #   first_name: "George",
    #   middle_name: "",
    #   last_name: "Washington",
    #   email: "fake@fake.com",
    #   username: "georgew",
    #   native_language: E2Quizzical.Repo.get(E2Quizzical.Language, 2),
    #   learning_language: E2Quizzical.Repo.get(E2Quizzical.Language, 1),
    #   rating: 3.89,
    #   is_visible: true,
    #   skill_level: E2Quizzical.Repo.get(E2Quizzical.SkillLevel, 2),
    #   is_online: true
    #   }
    #   |> E2Quizzical.Repo.insert()
    
    # IO.puts "created seed user account"

    # user
    # |> E2Quizzical.User.change_password_changeset(%{password: "Password2"})
    # |> E2Quizzical.Repo.update!()

  end
end
