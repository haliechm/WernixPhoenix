defmodule E2Quizzical.Repo.Migrations.AlterUsersLanguages do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :native_language_id, references(:languages, type: :integer), default: 4, null: false
      add :learning_language_id, references(:languages, type: :integer), default: 5, null: false
    end
  end
end
