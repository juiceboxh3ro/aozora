defmodule Aozora.Repo.Migrations.AddDiscordUserRecords do
  use Ecto.Migration

  def change do
    create table(:discord_members) do
      add :discord_id, :string, null: false
      add :discord_username, :string, null: false
      add :discord_discriminator, :string, null: false
      add :discord_avatar, :string
      add :discord_banner, :string
      add :discord_accent_color, :string
      add :discord_mfa_enabled, :boolean, null: false
      add :discord_verified, :boolean, null: false

      add :last_study_date, :utc_datetime
      add :study_streak, :integer, null: false, default: 0
      add :total_days_studied, :integer, null: false, default: 0

      timestamps()
    end
  end
end
