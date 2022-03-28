defmodule AozoraWeb.RadicalController do
  use AozoraWeb, :controller

  alias Aozora.KanjiData
  alias Aozora.KanjiData.Radical

  action_fallback AozoraWeb.FallbackController

  def index(conn, _params) do
    radicals = KanjiData.list_radicals()
    render(conn, "index.json", radicals: radicals)
  end

  def create(conn, %{"radical" => radical_params}) do
    with {:ok, %Radical{} = radical} <- KanjiData.create_radical(radical_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.radical_path(conn, :show, radical))
      |> render("show.json", radical: radical)
    end
  end

  def show(conn, %{"id" => id}) do
    radical = KanjiData.get_radical!(id)
    render(conn, "show.json", radical: radical)
  end

  def update(conn, %{"id" => id, "radical" => radical_params} = params) do
    radical = KanjiData.get_radical!(id)

    with {:ok, %Radical{} = radical} <- KanjiData.update_radical(radical, radical_params) do
      render(conn, "show.json", radical: radical)
    end
  end

  def delete(conn, %{"id" => id}) do
    radical = KanjiData.get_radical!(id)

    with {:ok, %Radical{}} <- KanjiData.delete_radical(radical) do
      send_resp(conn, :no_content, "")
    end
  end
end
