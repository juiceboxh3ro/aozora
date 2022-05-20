defmodule Aozora.Member.DiscordMember do
  use Ecto.Schema
  import Ecto.Changeset

  schema "discord_members" do
    field :discord_id, :string
    field :discord_username, :string
    field :discord_discriminator, :string, min: 4, max: 4
    field :discord_avatar, :string
    field :discord_banner, :string
    field :discord_accent_color, :string
    field :discord_mfa_enabled, :boolean
    field :discord_verified, :boolean

    field :last_study_date, :utc_datetime
    field :study_streak, :integer, default: 0
    field :total_days_studied, :integer, default: 0

    # { type: 'kanji' | 'example' | 'radical' | 'translation', value: :string }
    field :saved_search_results, :map, default: %{}

    timestamps()
  end

  @doc false
  def changeset(discord_member, attrs) do
    discord_member
    |> cast(attrs, [:discord_id, :discord_username, :discord_avatar, :discord_banner, :discord_accent_color, :discord_mfa_enabled, :discord_verified, :last_study_date, :study_streak, :total_days_studied, :saved_search_results])
    |> validate_required([:discord_id, :discord_username, :discord_discriminator])
    |> validate_length(:discord_discriminator, min: 4, max: 4)
    |> unique_constraint(:discord_id, message: "Discord Member already exists")
  end
end
