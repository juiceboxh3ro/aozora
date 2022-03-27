defmodule Aozora.KanjiData.Kanji do
  use Ecto.Schema
  import Ecto.Changeset

  alias Aozora.KanjiData.{Metadata, RadicalInfo, Radical, Example}

  schema "kanji" do
    field :onyomi, :string
    field :kunyomi, :string
    field :character, :string
    field :en_meaning, :string
    field :stroke_count, :integer, default: 1, min: 1, max: 99

    embeds_one :metadata, Metadata, on_replace: :update
    embeds_one :radical_info, RadicalInfo, on_replace: :update

    many_to_many :radicals, Radical, join_through: "kanji_radicals", on_replace: :delete
    has_many :examples, Example, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(kanji, attrs) do
    kanji
    |> cast(attrs, [:character, :en_meaning, :stroke_count, :onyomi, :kunyomi])
    |> validate_required([:character])
    |> validate_length([:character], max: 1)
    |> validate_length([:stroke_count], min: 1, max: 99)
    |> unique_constraint(:character)
    |> cast_embed([:metadata, :radical_info])
    |> cast_assoc(:radicals)
  end
end
