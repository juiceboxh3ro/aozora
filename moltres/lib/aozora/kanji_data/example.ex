defmodule Aozora.KanjiData.Example do
  use Ecto.Schema
  import Ecto.Changeset

  schema "examples" do
    field :english, :string
    field :japanese, :string

    belongs_to :kanji, Aozora.KanjiData.Kanji

    # :other_langs, :map, default: %{}

    timestamps()
  end

  @doc false
  def changeset(example, attrs) do
    example
    |> cast(attrs, [:japanese, :english])
    |> validate_required([:japanese, :english])
    |> assoc_constraint(:kanji)
  end
end
