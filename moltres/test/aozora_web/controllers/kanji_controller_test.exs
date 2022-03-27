defmodule AozoraWeb.KanjiControllerTest do
  use AozoraWeb.ConnCase

  import Aozora.KanjiDataFixtures

  alias Aozora.KanjiData.Kanji

  @create_attrs %{
    literal: "some literal"
  }
  @update_attrs %{
    literal: "some updated literal"
  }
  @invalid_attrs %{literal: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all kanji", %{conn: conn} do
      conn = get(conn, Routes.kanji_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create kanji" do
    test "renders kanji when data is valid", %{conn: conn} do
      conn = post(conn, Routes.kanji_path(conn, :create), kanji: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.kanji_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "literal" => "some literal"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.kanji_path(conn, :create), kanji: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update kanji" do
    setup [:create_kanji]

    test "renders kanji when data is valid", %{conn: conn, kanji: %Kanji{id: id} = kanji} do
      conn = put(conn, Routes.kanji_path(conn, :update, kanji), kanji: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.kanji_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "literal" => "some updated literal"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, kanji: kanji} do
      conn = put(conn, Routes.kanji_path(conn, :update, kanji), kanji: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete kanji" do
    setup [:create_kanji]

    test "deletes chosen kanji", %{conn: conn, kanji: kanji} do
      conn = delete(conn, Routes.kanji_path(conn, :delete, kanji))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.kanji_path(conn, :show, kanji))
      end
    end
  end

  defp create_kanji(_) do
    kanji = kanji_fixture()
    %{kanji: kanji}
  end
end
