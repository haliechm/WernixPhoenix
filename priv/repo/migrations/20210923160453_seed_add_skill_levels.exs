defmodule E2Quizzical.Repo.Migrations.SeedAddSkillLevels do
  use Ecto.Migration
  alias E2Quizzical.{Repo, SkillLevel}

  def change do
    Repo.insert!(%SkillLevel{name: "newbie"})
    Repo.insert!(%SkillLevel{name: "beginner"})
    Repo.insert!(%SkillLevel{name: "intermediate"})
    Repo.insert!(%SkillLevel{name: "advanced"})
    Repo.insert!(%SkillLevel{name: "expert"})

    IO.puts "added starter skill levels"
  end
end
