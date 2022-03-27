defmodule Aozora.KanjiDataTest do
  use Aozora.DataCase

  alias Aozora.KanjiData

  describe "kanji" do
    alias Aozora.KanjiData.Kanji

    import Aozora.KanjiDataFixtures

    @invalid_attrs %{character: nil}

    test "list_kanji/0 returns all kanji" do
      kanji = kanji_fixture()
      assert KanjiData.list_kanji() == [kanji]
    end

    test "get_kanji!/1 returns the kanji with given id" do
      kanji = kanji_fixture()
      assert KanjiData.get_kanji!(kanji.id) == kanji
    end

    test "create_kanji/1 with valid data creates a kanji" do
      valid_attrs = %{character: "字"}

      assert {:ok, %Kanji{} = kanji} = KanjiData.create_kanji(valid_attrs)
      assert kanji.character == "字"
    end

    test "create_kanji/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = KanjiData.create_kanji(@invalid_attrs)
    end

    test "update_kanji/2 with valid data updates the kanji" do
      kanji = kanji_fixture()
      update_attrs = %{character: "時"}

      assert {:ok, %Kanji{} = kanji} = KanjiData.update_kanji(kanji, update_attrs)
      assert kanji.character == "時"
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

    text "create_kanji/1 with metadata attributes casts and updates embedded data" do
      kanji = kanji_fixture()
      valid_attrs = Map.put(kanji, :metadata, %{ grade: 1, kodansha: 2105, classic_nelson: 1 })

      assert {:ok, %Kanji{} = kanji} = Kanji.create_kanji(valid_attrs)
      assert kanji.metadata.grade == 1
      assert kanji.metadata.kodansha == 2105
      assert kanji.metadata.classic_nelson == 1

      update_attrs = Map.put(kanji, :metadata, %{ grade: 2, kodansha: 2022, classic_nelson: 2 })
      assert kanji.metadata.grade == 2
      assert kanji.metadata.kodansha == 2022
      assert kanji.metadata.classic_nelson == 2
    end
  end

  describe "radicals" do
    alias Aozora.KanjiData.Radical

    import Aozora.KanjiDataFixtures

    @invalid_attrs %{bushu: nil, en_name: nil, jp_name: nil, meaning: nil}

    test "list_radicals/0 returns all radicals" do
      radical = radical_fixture()
      assert KanjiData.list_radicals() == [radical]
    end

    test "get_radical!/1 returns the radical with given id" do
      radical = radical_fixture()
      assert KanjiData.get_radical!(radical.id) == radical
    end

    test "create_radical/1 with valid data creates a radical" do
      valid_attrs = %{bushu: "some bushu", en_name: "some en_name", jp_name: "some jp_name", meaning: "some meaning"}

      assert {:ok, %Radical{} = radical} = KanjiData.create_radical(valid_attrs)
      assert radical.bushu == "some bushu"
      assert radical.en_name == "some en_name"
      assert radical.jp_name == "some jp_name"
      assert radical.meaning == "some meaning"
    end

    test "create_radical/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = KanjiData.create_radical(@invalid_attrs)
    end

    test "update_radical/2 with valid data updates the radical" do
      radical = radical_fixture()
      update_attrs = %{bushu: "some updated bushu", en_name: "some updated en_name", jp_name: "some updated jp_name", meaning: "some updated meaning"}

      assert {:ok, %Radical{} = radical} = KanjiData.update_radical(radical, update_attrs)
      assert radical.bushu == "some updated bushu"
      assert radical.en_name == "some updated en_name"
      assert radical.jp_name == "some updated jp_name"
      assert radical.meaning == "some updated meaning"
    end

    test "update_radical/2 with invalid data returns error changeset" do
      radical = radical_fixture()
      assert {:error, %Ecto.Changeset{}} = KanjiData.update_radical(radical, @invalid_attrs)
      assert radical == KanjiData.get_radical!(radical.id)
    end

    test "delete_radical/1 deletes the radical" do
      radical = radical_fixture()
      assert {:ok, %Radical{}} = KanjiData.delete_radical(radical)
      assert_raise Ecto.NoResultsError, fn -> KanjiData.get_radical!(radical.id) end
    end

    test "change_radical/1 returns a radical changeset" do
      radical = radical_fixture()
      assert %Ecto.Changeset{} = KanjiData.change_radical(radical)
    end
  end

  describe "examples" do
    alias Aozora.KanjiData.Example

    import Aozora.KanjiDataFixtures

    @invalid_attrs %{english: nil, japanese: nil}

    test "list_examples/0 returns all examples" do
      example = example_fixture()
      assert KanjiData.list_examples() == [example]
    end

    test "get_example!/1 returns the example with given id" do
      example = example_fixture()
      assert KanjiData.get_example!(example.id) == example
    end

    test "create_example/1 with valid data creates a example" do
      valid_attrs = %{english: "some english", japanese: "some japanese"}

      assert {:ok, %Example{} = example} = KanjiData.create_example(valid_attrs)
      assert example.english == "some english"
      assert example.japanese == "some japanese"
    end

    test "create_example/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = KanjiData.create_example(@invalid_attrs)
    end

    test "update_example/2 with valid data updates the example" do
      example = example_fixture()
      update_attrs = %{english: "some updated english", japanese: "some updated japanese"}

      assert {:ok, %Example{} = example} = KanjiData.update_example(example, update_attrs)
      assert example.english == "some updated english"
      assert example.japanese == "some updated japanese"
    end

    test "update_example/2 with invalid data returns error changeset" do
      example = example_fixture()
      assert {:error, %Ecto.Changeset{}} = KanjiData.update_example(example, @invalid_attrs)
      assert example == KanjiData.get_example!(example.id)
    end

    test "delete_example/1 deletes the example" do
      example = example_fixture()
      assert {:ok, %Example{}} = KanjiData.delete_example(example)
      assert_raise Ecto.NoResultsError, fn -> KanjiData.get_example!(example.id) end
    end

    test "change_example/1 returns a example changeset" do
      example = example_fixture()
      assert %Ecto.Changeset{} = KanjiData.change_example(example)
    end
  end
end
