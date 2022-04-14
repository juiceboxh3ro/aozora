defmodule Aozora.KanjiData.Radical do
  use Ecto.Schema
  import Ecto.Changeset

  schema "radicals" do
    field :bushu, :string
    field :en_name, :string
    field :jp_name, :string
    field :meaning, :string # english meaning
    field :position, :string # used if a radical always appears in the same position
    field :stroke_count, :integer
    field :variant, :string
    field :important, :boolean
    field :frequency, :integer, default: 1, min: 1
    field :hangul, :string
    field :han_viet, :string
    field :pinyin, :string
    field :number, :integer, default: 1, min: 1, max: 214 # number of radical in sequence (in case ID mismatch)
    field :simplified, :string

    many_to_many :kanji, Aozora.KanjiData.Kanji, join_through: "kanji_radicals", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(radical, attrs) do
    radical
    |> cast(attrs, [:bushu, :jp_name, :en_name, :meaning, :position, :stroke_count, :variant, :important, :frequency, :hangul, :han_viet, :pinyin, :number, :simplified])
    |> validate_required([:bushu])
    |> unique_constraint(:bushu, message: "Radical already exists")
    |> cast_assoc(:kanji)
  end
end
