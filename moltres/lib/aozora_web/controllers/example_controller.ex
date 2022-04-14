defmodule AozoraWeb.ExampleController do
  use AozoraWeb, :controller

  alias Aozora.KanjiData
  alias Aozora.KanjiData.Example

  action_fallback AozoraWeb.FallbackController

  def index(conn, _params) do
    examples = KanjiData.list_examples()
    render(conn, "index.json", examples: examples)
  end

  def create(conn, %{"example" => example_params, "kanji_id" => kanji_id}) do
    kanji = KanjiData.get_kanji!(kanji_id)

    with {:ok, %Example{} = example} <- KanjiData.create_example(%{ example: example_params, kanji: kanji }) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.example_path(conn, :show, example))
      |> render("show.json", example: example)
    end
  end

  def show(conn, %{"id" => id}) do
    example = KanjiData.get_example!(id)
    render(conn, "show.json", example: example)
  end

  def update(conn, %{"id" => id, "example" => example_params}) do
    example = KanjiData.get_example!(id)

    with {:ok, %Example{} = example} <- KanjiData.update_example(example, example_params) do
      render(conn, "show.json", example: example)
    end
  end

  def delete(conn, %{"id" => id}) do
    example = KanjiData.get_example!(id)

    with {:ok, %Example{}} <- KanjiData.delete_example(example) do
      send_resp(conn, :no_content, "")
    end
  end
end
