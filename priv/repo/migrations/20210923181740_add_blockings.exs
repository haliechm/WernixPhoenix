defmodule E2Quizzical.Repo.Migrations.AddBlockings do
  use Ecto.Migration

  def change do
    create table(:blockings, primary_key: false) do
      add :id, :serial, primary_key: true
      add :blocked_by_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      add :blocked_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      timestamps(type: :timestamptz)
    end
      # add unique constraint to both users in the blockings relationship
    create unique_index(:blockings, [:blocked_by_id, :blocked_id])

    end
end
