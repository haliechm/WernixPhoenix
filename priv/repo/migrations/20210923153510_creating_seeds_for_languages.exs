defmodule E2Quizzical.Repo.Migrations.CreatingSeedsForLanguages do
  use Ecto.Migration
  alias E2Quizzical.{
      Repo,
      User,
      Role,
      UserRole,
      Language
    }

  def change do
    Repo.insert!(%Language{name: "English"})
    Repo.insert!(%Language{name: "Spanish"})
    Repo.insert!(%Language{name: "French"})
    Repo.insert!(%Language{name: "Russian"})
    Repo.insert!(%Language{name: "Swahili"})
    Repo.insert!(%Language{name: "Chinese"})

    IO.puts "added starter languages"
  end
end
