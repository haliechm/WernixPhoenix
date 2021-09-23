defmodule E2Quizzical.Repo.Migrations.AddLanguagesTable do
  use Ecto.Migration

  # this is my first ecto migration ever :)
  def change do
    create table(:languages, primary_key: false) do
      add :id, :serial, primary_key: true
      add :name, :string, size: 100, null: false
      timestamps(type: :timestamptz)
    end

    # need to add unique constraint to name
    create unique_index(:languages, [:name])

  end
end
