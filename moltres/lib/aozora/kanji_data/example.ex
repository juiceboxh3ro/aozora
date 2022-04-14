defmodule Aozora.KanjiData.Example do
  use Ecto.Schema
  import Ecto.Changeset

  schema "examples" do
    field :japanese, :string
    field :english, :string

    many_to_many :kanji, Aozora.KanjiData.Kanji, join_through: "kanji_examples", on_replace: :delete

    timestamps()
  end

  @spec changeset(
          {map, map}
          | %{
              :__struct__ => atom | %{:__changeset__ => map, optional(any) => any},
              optional(atom) => any
            },
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any}
        ) :: map
  @doc false
  def changeset(example, attrs) do
    example
    |> cast(attrs, [:japanese, :english])
    |> validate_required([:japanese, :english])
    |> unique_constraint(:japanese, message: "Japanese in examples already exists")
    |> cast_assoc(:kanji)
  end

  # |> put_assoc(:kanji, parse_kanji_ids(attrs))
  # defp parse_kanji_ids(attrs) do
  #   (attrs["kanji_ids"] || "")
  #   |> String.split(",")
  #   |> Enum.map(&String.trim/1)
  #   |> Enum.reject(& &1 == "")
  # end
end
