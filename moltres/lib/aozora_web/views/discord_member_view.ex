defmodule AozoraWeb.DiscordMemberView do
  use AozoraWeb, :view
  alias AozoraWeb.DiscordMemberView

  def render("index.json", %{members: members}) do
    %{data: render_many(members, DiscordMemberView, "member.json")}
  end

  def render("show.json", %{member: member}) do
    %{data: render_one(member, DiscordMemberView, "member.json")}
  end

  def render("member.json", %{member: member}) do
    %{
      id: member.id,
      discord_id: member.discord_id,
      discord_username: member.discord_username,
      discord_discriminator: member.discord_discriminator,
      discord_avatar: member.discord_avatar,
      discord_verified: member.discord_verified,
      discord_mfa_enabled: member.discord_mfa_enabled,
      discord_banner: member.discord_banner,
      discord_accent_color: member.discord_accent_color,
      last_study_date: member.last_study_date,
      study_streak: member.study_streak,
      total_days_studied: member.total_days_studied,
      saved_search_results: member.saved_search_results,
      inserted_at: member.inserted_at,
      updated_at: member.updated_at,
    }
  end
end
