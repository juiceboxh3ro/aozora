defmodule Aozora.KanjiData do
  @moduledoc """
  The KanjiData context.
  """

  import Ecto.Query, warn: false
  alias Aozora.Repo

  alias Aozora.KanjiData.Kanji

  @doc """
  Returns the list of kanji.

  ## Examples

      iex> list_kanji()
      [%Kanji{}, ...]

  """
  def list_kanji do
    Repo.all(Kanji)
  end

  @doc """
  Gets a single kanji.

  Raises `Ecto.NoResultsError` if the Kanji does not exist.

  ## Examples

      iex> get_kanji!(123)
      %Kanji{}

      iex> get_kanji!(456)
      ** (Ecto.NoResultsError)

  """
  def get_kanji!(id), do: Repo.get!(Kanji, id)

  @doc """
  Creates a kanji.

  ## Examples

      iex> create_kanji(%{field: value})
      {:ok, %Kanji{}}

      iex> create_kanji(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_kanji(attrs \\ %{}) do
    %Kanji{}
    |> Kanji.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a kanji.

  ## Examples

      iex> update_kanji(kanji, %{field: new_value})
      {:ok, %Kanji{}}

      iex> update_kanji(kanji, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_kanji(%Kanji{} = kanji, attrs) do
    kanji
    |> Kanji.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a kanji.

  ## Examples

      iex> delete_kanji(kanji)
      {:ok, %Kanji{}}

      iex> delete_kanji(kanji)
      {:error, %Ecto.Changeset{}}

  """
  def delete_kanji(%Kanji{} = kanji) do
    Repo.delete(kanji)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking kanji changes.

  ## Examples

      iex> change_kanji(kanji)
      %Ecto.Changeset{data: %Kanji{}}

  """
  def change_kanji(%Kanji{} = kanji, attrs \\ %{}) do
    Kanji.changeset(kanji, attrs)
  end
end
