defmodule Aozora.KanjiData do
  @moduledoc """
  The KanjiData context.
  """

  import Ecto.Query, warn: false
  alias Aozora.Repo

  alias Aozora.KanjiData.{Kanji, Radical, Example}

  @doc """
  Returns the list of kanji.

  ## Examples

      iex> list_kanji()
      [%Kanji{}, ...]

  """
  def list_kanji do
    Repo.all(Kanji)
  end

  # defp list_kanji_by_id(nil), do: []
  # defp list_kanji_by_id(kanji_ids) do
  #   Repo.all(from k in Kanji, where: k.id in ^kanji_ids)
  # end

  defp list_kanji_by_character(nil), do: []
  defp list_kanji_by_character(%{ "kanji" => kanji }) do
    Repo.one(from k in Kanji, where: k.character == ^kanji)
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
  def get_kanji!(id) do
    Kanji
    |> Repo.get!(id)
    |> Repo.preload(:examples)
    |> Repo.preload(:radicals)
  end

  def get_kanji_by_character(kanji) do
    Repo.one(
      from(k in Kanji,
        where: k.character == ^kanji,
        left_join: e in assoc(k, :examples),
        left_join: r in assoc(k, :radicals),
        preload: [:radicals],
        preload: [:examples]
      )
    )
  end

  def add_example_to_kanji(%Kanji{} = kanji, %Example{} = example) do
    kanji
    |> Kanji.changeset(%{})
    |> Ecto.Changeset.put_assoc(:examples, example)
    |> Ecto.Changeset.put_assoc(:kanji, kanji)
    |> Repo.update()
  end

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
    |> case do
      {:ok, %Kanji{} = kanji} -> {:ok, Repo.preload(kanji, :radicals)}
      error -> error
    end
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



  @doc """
  Returns the list of radicals.

  ## Examples

      iex> list_radicals()
      [%Radical{}, ...]

  """
  def list_radicals do
    Repo.all(Radical)
  end

  # defp list_radical_by_id(nil), do: []
  # defp list_radical_by_id(radical) do
  #   Repo.all(from r in Radical, where: r.id in ^radical)
  # end

  # TODO:
  # defp list_radical_by_character(nil), do: []
  # defp list_radical_by_character(radical) do
  #   Repo.all(from r in Radical, where: r.character in ^radical)
  # end

  @doc """
  Gets a single radical.

  Raises `Ecto.NoResultsError` if the Radical does not exist.

  ## Examples

      iex> get_radical!(123)
      %Radical{}

      iex> get_radical!(456)
      ** (Ecto.NoResultsError)

  """
  def get_radical!(id), do: Repo.get!(Radical, id)

  @doc """
  Creates a radical.

  ## Examples

      iex> create_radical(%{field: value})
      {:ok, %Radical{}}

      iex> create_radical(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_radical(attrs \\ %{}) do
    %Radical{}
    |> Radical.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a radical.

  ## Examples

      iex> update_radical(radical, %{field: new_value})
      {:ok, %Radical{}}

      iex> update_radical(radical, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_radical(%Radical{} = radical, attrs) do
    radical
    |> change_radical(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a radical.

  ## Examples

      iex> delete_radical(radical)
      {:ok, %Radical{}}

      iex> delete_radical(radical)
      {:error, %Ecto.Changeset{}}

  """
  def delete_radical(%Radical{} = radical) do
    Repo.delete(radical)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking radical changes.

  ## Examples

      iex> change_radical(radical)
      %Ecto.Changeset{data: %Radical{}}

  """
  def change_radical(%Radical{} = radical, attrs \\ %{}) do
    kanji = list_kanji_by_character(%{"kanji" => attrs})

    IO.inspect(kanji)

    radical
    |> Repo.preload(:kanji)
    |> Radical.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:kanji, kanji)
  end

  @doc """
  Returns the list of examples.

  ## Examples

      iex> list_examples()
      [%Example{}, ...]

  """
  def list_examples do
    Repo.all(Example)
  end

  @doc """
  Gets a single example.

  Raises `Ecto.NoResultsError` if the Example does not exist.

  ## Examples

      iex> get_example!(123)
      %Example{}

      iex> get_example!(456)
      ** (Ecto.NoResultsError)

  """
  def get_example!(id), do: Repo.get!(Example, id)

  @doc """
  Creates a example and assigns it to a kanji.

  ## Examples

      iex> create_example(%Kanji{}, %{english: "this is the example"})
      {:ok, %Example{}}

      iex> create_example(%Kanji{}, %{english: false})
      {:error, %Ecto.Changeset{}}

  """
  def create_example(%Kanji{} = kanji, attrs \\ %{}) do
    kanji
    |> Ecto.build_assoc(:examples)
    |> Example.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a example.

  ## Examples

      iex> update_example(example, %{japanese: "日本語です"})
      {:ok, %Example{}}

      iex> update_example(example, %{japanese: 24})
      {:error, %Ecto.Changeset{}}

  """
  def update_example(%Example{} = example, attrs) do
    example
    |> change_example(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a example.

  ## Examples

      iex> delete_example(example)
      {:ok, %Example{}}

      iex> delete_example(example)
      {:error, %Ecto.Changeset{}}

  """
  def delete_example(%Example{} = example) do
    Repo.delete(example)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking example changes.

  ## Examples

      iex> change_example(example)
      %Ecto.Changeset{data: %Example{}}

  """
  def change_example(%Example{} = example, attrs \\ %{}) do
    Example.changeset(example, attrs)
  end
end
