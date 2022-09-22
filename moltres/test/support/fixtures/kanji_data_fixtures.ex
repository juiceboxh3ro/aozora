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

      })
      |> Aozora.KanjiData.create_kanji()

    kanji
  end
end
