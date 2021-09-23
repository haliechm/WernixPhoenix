defmodule E2Quizzical.Repo.Migrations.AlterUsers do
  use Ecto.Migration

  def change do

    alter table("users") do
      add :native_language_id, references(:languages, type: :integer), default: 1, null: false
      add :learning_language_id, references(:languages, type: :integer), default: 2, null: false
      add :rating, :float, default: 2.5, null: false
      add :is_visible, :boolean, default: true, null: false
      add :skill_level_id, references(:skill_levels, type: :integer), default: 2, null: false
      add :is_online, :boolean, default: true, null: false
      add :birthdate, :date, null: true
    end
  
  end
end
