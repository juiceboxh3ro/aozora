defmodule Aozora.KanjiDataTest do
  use Aozora.DataCase

  alias Aozora.KanjiData

  describe "kanji" do
    alias Aozora.KanjiData.Kanji

    import Aozora.KanjiDataFixtures

    @invalid_attrs %{}

    test "list_kanji/0 returns all kanji" do
      kanji = kanji_fixture()
      assert KanjiData.list_kanji() == [kanji]
    end

    test "get_kanji!/1 returns the kanji with given id" do
      kanji = kanji_fixture()
      assert KanjiData.get_kanji!(kanji.id) == kanji
    end

    test "create_kanji/1 with valid data creates a kanji" do
      valid_attrs = %{}

      assert {:ok, %Kanji{} = kanji} = KanjiData.create_kanji(valid_attrs)
    end

    test "create_kanji/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = KanjiData.create_kanji(@invalid_attrs)
    end

    test "update_kanji/2 with valid data updates the kanji" do
      kanji = kanji_fixture()
      update_attrs = %{}

      assert {:ok, %Kanji{} = kanji} = KanjiData.update_kanji(kanji, update_attrs)
    end

    test "update_kanji/2 with invalid data returns error changeset" do
      kanji = kanji_fixture()
      assert {:error, %Ecto.Changeset{}} = KanjiData.update_kanji(kanji, @invalid_attrs)
      assert kanji == KanjiData.get_kanji!(kanji.id)
    end

    test "delete_kanji/1 deletes the kanji" do
      kanji = kanji_fixture()
      assert {:ok, %Kanji{}} = KanjiData.delete_kanji(kanji)
      assert_raise Ecto.NoResultsError, fn -> KanjiData.get_kanji!(kanji.id) end
    end

    test "change_kanji/1 returns a kanji changeset" do
      kanji = kanji_fixture()
      assert %Ecto.Changeset{} = KanjiData.change_kanji(kanji)
    end
  end
end
