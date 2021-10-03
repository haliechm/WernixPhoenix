defmodule E2Quizzical.Repo.Migrations.AddLanguages do
  use Ecto.Migration
  alias E2Quizzical.{Repo, Language}

  def change do
    Repo.insert!(%Language{name: "English"})
    Repo.insert!(%Language{name: "Spanish"})
    Repo.insert!(%Language{name: "Swahili"})
    Repo.insert!(%Language{name: "Russian"})
    Repo.insert!(%Language{name: "French"})

    IO.puts "added starter language levels"
  end
end
