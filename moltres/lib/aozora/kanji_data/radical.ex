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
    field :variant_of, :string
    field :important, :boolean

    many_to_many :kanji, Aozora.KanjiData.Kanji, join_through: "kanji_radicals", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(radical, attrs) do
    radical
    |> cast(attrs, [:bushu, :jp_name, :en_name, :meaning, :position, :stroke_count, :variant_of, :important])
    |> validate_required([:bushu])
  end
end
