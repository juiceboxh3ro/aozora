defmodule Aozora.KanjiData do
  @moduledoc """
  The KanjiData context.
  """

  import Ecto.Query, warn: false
  alias Aozora.Repo
  alias Aozora.KanjiData.{Kanji, Radical, Example}

  @doc """
  Check if list contains only integers or strings.

  ## Examples

      iex> is_int_or_str(["string", 2])
      true

      iex> is_int_or_str(%{})
      false
  """
  def is_int_or_str(list) do
    list |> Enum.all?(fn item -> is_integer(item) or is_bitstring(item) end)
  end

 @doc """
  Groups list items passed in from params by integer or string.

  ## Examples

      iex> check_list_item_types(["一", 2])
      {false: ["一"], true: [2]}

      iex> check_list_item_types()
      []
  """
  def check_list_item_types(nil), do: []
  def check_list_item_types(list) do
    if Enum.any?(list) and is_int_or_str(list) do
      list |> Enum.group_by(fn item -> is_integer(item) end)
    else
      []
    end
  end

  @doc """
  Returns a list of kanji by id or character from a grouped list.

  ## Examples

    iex> get_kanji_by_id_or_string({ false: ["一"], true: [2] })
    [%Kanji{ id: 1, character: "一", ... }, %Kanji{ id: 2, character: "二", ... }]

    iex> get_kanji_by_id_or_string({ true: [2] })
    [%Kanji{ id: 2, character: "二", ...}]

    iex> get_kanji_by_id_or_string()
    []
  """
  def get_kanji_by_id_or_string(grouped) do
    ids_result = list_kanji_by_id(grouped[:true])

    # TODO: check if characters in range of kanji unicode
    chars_result = list_kanji_by_character(grouped[:false])

    ids_result ++ chars_result
  end

  @doc """
  Returns the list of kanji.

  ## Examples

      iex> list_kanji()
      [%Kanji{}, ...]

  """
  def list_kanji do
    Kanji
    |> Repo.all
    |> Repo.preload([:radicals, :examples])
  end

  defp list_kanji_by_id(nil), do: []
  defp list_kanji_by_id(kanji_ids) do
    Repo.all(from k in Kanji, where: k.id in ^kanji_ids)
  end

  defp list_kanji_by_character(nil), do: []
  defp list_kanji_by_character(kanji) do
    Repo.all(from k in Kanji, where: k.character in ^kanji)
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
    |> Repo.preload([:radicals, :examples])
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

  def get_many_kanji_by_character(kanji) do
    IO.inspect(kanji)
    Repo.all(
      from(k in Kanji,
        where: k.character in ^kanji,
        left_join: e in assoc(k, :examples),
        left_join: r in assoc(k, :radicals),
        preload: [:radicals],
        preload: [:examples]
      )
    )
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
    |> Repo.insert(
      on_conflict: { :replace_all_except, [:id, :inserted_at] },
      conflict_target: :character
    )
    |> case do
      {:ok, %Kanji{} = kanji} -> {:ok, Repo.preload(kanji, [:radicals, :examples])}
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
    radicals = check_list_item_types(attrs["radicals"]) |> get_radical_by_id_or_string

    kanji
    |> Repo.preload(:radicals)
    |> change_kanji(attrs)
    |> Ecto.Changeset.put_assoc(:radicals, radicals)
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
    kanji |> Kanji.changeset(attrs["kanji"])
  end

  @doc """
  Returns a list of kanji by id or character from a grouped list.

  ## Examples

      iex> get_radical_by_id_or_string({ false: ["一"], true: [2] })
      [%Radical{ id: 1, bushu: "一", ... }]

      iex> get_radical_by_id_or_string({ true: [1] })
      [%Radical{ id: 1, bushu: "二", ...}]

      iex> get_radical_by_id_or_string()
      []
  """
  def get_radical_by_id_or_string(grouped) do
    ids_result = list_radical_by_id(grouped[:true])

    # TODO: check if characters in range of radicals unicode
    chars_result = list_radical_by_character(grouped[:false])

    ids_result ++ chars_result
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

  defp list_radical_by_id(nil), do: []
  defp list_radical_by_id(radicals) do
    Repo.all(from r in Radical, where: r.id in ^radicals)
  end

  defp list_radical_by_character(nil), do: []
  defp list_radical_by_character(radicals) do
    Repo.all(from r in Radical, where: r.bushu in ^radicals)
  end

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

  def get_radical_by_character(bushu) do
    Repo.one(
      from(r in Radical,
        where: r.bushu == ^bushu,
        left_join: k in assoc(r, :kanji),
        preload: [:kanji]
      )
    )
  end

  def get_radicals_by_character(bushu) do
    Repo.all(
      from(r in Radical,
        where: r.bushu in ^bushu,
        left_join: k in assoc(r, :kanji),
        preload: [:kanji]
      )
    )
  end

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
    |> Repo.insert(
      on_conflict: { :replace_all_except, [:id, :inserted_at] },
      conflict_target: :bushu
    )
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
    Radical.changeset(radical, attrs)
  end

  def create_kanji_radical_relationship(radical, kanji) do
    %{ kanji_id: kanji.id, radical_id: radical.id }
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
  def get_example!(id), do: Example |> Repo.get!(id)

  def get_example_by_japanese(japanese) do
    Repo.one(
      from(e in Example, where: e.japanese == ^japanese)
    )
  end

  @doc """
  Creates a example and assigns it to a kanji.

  ## Examples

      iex> create_example(
        %Example{},
        %Kanji{},
        %{ example: %{ japanese: "日本語です", english: "this is the example" } }
      )
      {:ok, %Example{}}

      iex> create_example(%Kanji{}, %{english: false})
      {:error, %Ecto.Changeset{}}

  """
  def create_example(%{example: example, kanji: kanji}) do
    %Example{}
    |> Example.changeset(example)
    |> Ecto.Changeset.put_assoc(:kanji, [kanji])
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

  # def seed_radical(%{radical: radical, kanji: kanji}) do
  #   %Radical{}
  #   |> Radical.changeset(radical)
  #   |> Ecto.Changeset.put_assoc(:kanji, [kanji])
  #   |> Repo.insert()

  #   changeset = Radical.changeset(radical, %{ kanji: kanji })
  #   Ecto.Multi.new()
  #   |> Ecto.Multi.insert_or_update(:insert_or_update, changeset)
  #   |> Aozora.Repo.transaction()

  #   Ecto.Multi.new()
  #   |> Ecto.Multi.run(:radical, fn repo, _changes ->
  #     {:ok, repo.get(Radical, 1) || %Radical{}}
  #   end)
  #   |> Ecto.Multi.insert_or_update(:update, fn %{radical: radical} ->
  #     Ecto.Changeset.change(radical, %{ kanji: kanji })
  #   end)
  #   |> Aozora.Repo.transaction()
  # end
end
