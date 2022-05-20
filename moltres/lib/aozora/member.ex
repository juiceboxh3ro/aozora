defmodule Aozora.Member do
  import Ecto.Query, warn: false
  alias Aozora.Repo
  alias Aozora.Member.{DiscordMember}

  def list_discord_members do
    Repo.all(DiscordMember)
  end

  def create_discord_member(attrs \\ %{}) do
    %DiscordMember{}
    |> DiscordMember.changeset(attrs)
    |> Repo.insert()
  end

  def get_discord_member!(id), do: DiscordMember |> Repo.get!(id)

  def update_discord_member(%DiscordMember{} = member, attrs) do
    member
    |> change_discord_member(attrs)
    |> Repo.update()
  end

  def delete_discord_member(%DiscordMember{} = member) do
    Repo.delete(member)
  end

  def change_discord_member(%DiscordMember{} = member, attrs \\ %{}) do
    DiscordMember.changeset(member, attrs)
  end
end
