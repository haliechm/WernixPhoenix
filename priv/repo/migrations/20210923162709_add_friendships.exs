defmodule E2Quizzical.Repo.Migrations.AddFriendships do
  use Ecto.Migration

  def change do
    create table(:friendships, primary_key: false) do
      add :id, :serial, primary_key: true
      add :friend_1_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      add :friend_2_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      timestamps(type: :timestamptz)
    end
      # add unique constraint to both friends in the friendship relationship
    create unique_index(:friendships, [:friend_1_id, :friend_2_id])
   
  end
end
