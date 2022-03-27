defmodule AozoraWeb.RadicalControllerTest do
  use AozoraWeb.ConnCase

  import Aozora.KanjiDataFixtures

  alias Aozora.KanjiData.Radical

  @create_attrs %{
    bushu: "some bushu",
    en_name: "some en_name",
    jp_name: "some jp_name",
    meaning: "some meaning"
  }
  @update_attrs %{
    bushu: "some updated bushu",
    en_name: "some updated en_name",
    jp_name: "some updated jp_name",
    meaning: "some updated meaning"
  }
  @invalid_attrs %{bushu: nil, en_name: nil, jp_name: nil, meaning: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all radicals", %{conn: conn} do
      conn = get(conn, Routes.radical_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create radical" do
    test "renders radical when data is valid", %{conn: conn} do
      conn = post(conn, Routes.radical_path(conn, :create), radical: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.radical_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "bushu" => "some bushu",
               "en_name" => "some en_name",
               "jp_name" => "some jp_name",
               "meaning" => "some meaning"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.radical_path(conn, :create), radical: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update radical" do
    setup [:create_radical]

    test "renders radical when data is valid", %{conn: conn, radical: %Radical{id: id} = radical} do
      conn = put(conn, Routes.radical_path(conn, :update, radical), radical: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.radical_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "bushu" => "some updated bushu",
               "en_name" => "some updated en_name",
               "jp_name" => "some updated jp_name",
               "meaning" => "some updated meaning"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, radical: radical} do
      conn = put(conn, Routes.radical_path(conn, :update, radical), radical: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete radical" do
    setup [:create_radical]

    test "deletes chosen radical", %{conn: conn, radical: radical} do
      conn = delete(conn, Routes.radical_path(conn, :delete, radical))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.radical_path(conn, :show, radical))
      end
    end
  end

  defp create_radical(_) do
    radical = radical_fixture()
    %{radical: radical}
  end
end
