defmodule E2Quizzical.Repo.Migrations.CreateInitialSchema do
  use Ecto.Migration

  def change do
    create table(:roles, primary_key: false) do
      add :id, :integer, primary_key: true
      add :name, :string, size: 100, null: false
    end

    create table(:users, primary_key: false) do
      add :id, :serial, primary_key: true
      add :first_name, :string, size: 35, null: false
      add :middle_name, :string, size: 35, null: false
      add :last_name, :string, size: 35, null: false
      add :email, :string, size: 150, null: false
      add :username, :string, size: 150, null: false
      add :encrypted_password, :string, size: 255
      add :timezone, :string, null: false, size: 75, default: "America/New_York"
      add :last_login_at, :utc_datetime
      add :reset_password_token, :uuid
      add :reset_password_requested_at, :utc_datetime
      add :last_locked_out_at, :utc_datetime
      add :failed_attempt_count, :integer
      add :must_change_password, :boolean, default: false
      add :two_factor_key, :string, size: 32
      add :two_factor_key_created_at, :utc_datetime
      add :disable_2fa, :boolean, default: true
      add :mobile_number, :string, size: 15
      add :image_url, :string, size: 250
      add :mime_type, :string, size: 100
      add :deactivated_at, :utc_datetime
      add :deactivated_by_user_id, references(:users, type: :integer, on_delete: :delete_all)
      timestamps(type: :timestamptz)
    end
    create unique_index(:users, [:email, :deactivated_at])
    create unique_index(:users, [:username, :deactivated_at])

    create table(:user_roles, primary_key: false) do
      add :id, :serial, primary_key: true
      add :user_id, references(:users, type: :integer, on_delete: :delete_all), null: false
      add :role_id, references(:roles, type: :integer, on_delete: :delete_all), null: false
      add :created_by_user_id, references(:users, type: :integer, on_delete: :delete_all), null: true
      add :deactivated_at, :utc_datetime
      add :deactivated_by_user_id, references(:users, type: :integer, on_delete: :delete_all)
      timestamps(type: :timestamptz)
    end
    create index(:user_roles, [:user_id, :role_id, :deactivated_at])

    create table(:logon_attempts, primary_key: false) do
      add :id, :serial, primary_key: true
      add :occurred_at, :utc_datetime, null: false
      add :username, :string, size: 150
      add :ip_address, :string, size: 46, null: false
      add :was_successful, :boolean, null: false
    end
  end
end
