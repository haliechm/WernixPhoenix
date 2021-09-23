defmodule E2Quizzical.Repo.Migrations.AddSkillLevelsTable do
  use Ecto.Migration

    def change do
      create table(:skill_levels, primary_key: false) do
        add :id, :serial, primary_key: true
        add :name, :string, size: 25, null: false
        timestamps(type: :timestamptz)
      end

    # add unique constraint to name
    create unique_index(:skill_levels, [:name])
  end

end
