defmodule Aozora.KanjiDataFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Aozora.KanjiData` context.
  """

  @doc """
  Generate a kanji.
  """
  def kanji_fixture(attrs \\ %{}) do
    {:ok, kanji} =
      attrs
      |> Enum.into(%{
        character: "字",
        en_meaning: "character",
        stroke_count: "6",
        onyomi: "ジ",
        kunyomi: "アザ,アザナ,-ナ",
        metadata: %{},
      })
      |> Aozora.KanjiData.create_kanji()

    kanji
  end

  @doc """
  Generate a radical.
  """
  def radical_fixture(attrs \\ %{}) do
    {:ok, radical} =
      attrs
      |> Enum.into(%{
        bushu: "some bushu",
        en_name: "some en_name",
        jp_name: "some jp_name",
        meaning: "some meaning"
      })
      |> Aozora.KanjiData.create_radical()

    radical
  end

  @doc """
  Generate a example.
  """
  def example_fixture(attrs \\ %{}) do
    {:ok, example} =
      attrs
      |> Enum.into(%{
        english: "some english",
        japanese: "some japanese"
      })
      |> Aozora.KanjiData.create_example()

    example
  end
end
