defmodule AozoraWeb.KanjiController do
  use AozoraWeb, :controller

  alias Aozora.KanjiData
  alias Aozora.KanjiData.Kanji

  action_fallback AozoraWeb.FallbackController

  def index(conn, _params) do
    kanji = KanjiData.list_kanji()
    render(conn, "index.json", kanji: kanji)
  end

  def create(conn, %{"kanji" => kanji_params}) do
    with {:ok, %Kanji{} = kanji} <- KanjiData.create_kanji(kanji_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.kanji_path(conn, :show, kanji))
      |> render("show.json", kanji: kanji)
    end
  end

  def show(conn, %{"id" => id}) do
    kanji = KanjiData.get_kanji!(id)
    render(conn, "show.json", kanji: kanji)
  end

  def show_character(conn, %{"character" => character}) do
    kanji = KanjiData.get_kanji_by_character(character)
    render(conn, "show.json", kanji: kanji)
  end

  def show_many_characters(conn, %{"kanji" => kanji}) do
    kanji = KanjiData.get_many_kanji_by_character(kanji)
    render(conn, "index.json", kanji: kanji)
  end

  def update(conn, %{"id" => id} = params) do
    kanji = KanjiData.get_kanji!(id)

    with {:ok, %Kanji{} = kanji} <- KanjiData.update_kanji(kanji, params) do
      render(conn, "show.json", kanji: kanji)
    end
  end

  def delete(conn, %{"id" => id}) do
    kanji = KanjiData.get_kanji!(id)

    with {:ok, %Kanji{}} <- KanjiData.delete_kanji(kanji) do
      send_resp(conn, :no_content, "")
    end
  end
end
