defmodule AozoraWeb.DiscordMemberController do
  use AozoraWeb, :controller

  alias Aozora.Member
  alias Aozora.Member.DiscordMember

  action_fallback AozoraWeb.FallbackController

  def index(conn, _params) do
    members = Member.list_discord_members()
    render(conn, "index.json", members: members)
  end

  def create(conn, %{"id" => member_params}) do
    with {:ok, %DiscordMember{} = member} <- Member.create_discord_member(member_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.discord_member_path(conn, :show, member))
      |> render("show.json", member: member)
    end
  end

  def show(conn, %{"id" => id}) do
    IO.puts(id)
    member = Member.get_discord_member!(id)
    render(conn, "show.json", member: member)
  end

  def update(conn, %{"id" => id} = params) do
    member = Member.get_discord_member!(id)

    with {:ok, %DiscordMember{} = member} <- Member.update_discord_member(member, params) do
      render(conn, "show.json", member: member)
    end
  end

  def delete(conn, %{"id" => id}) do
    member = Member.get_discord_member!(id)

    with {:ok, %DiscordMember{}} <- Member.delete_discord_member(member) do
      send_resp(conn, :no_content, "")
    end
  end
end
