defmodule E2Quizzical.Repo.Migrations.AddMessages do
  use Ecto.Migration

  def change do
    create table(:messages, primary_key: false) do
      add :id, :serial, primary_key: true
      add :created_by_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      add :received_by_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      add :content, :string, size: 500, null: false
      timestamps(type: :timestamptz)
    end
      
  end
end
