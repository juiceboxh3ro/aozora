defmodule Aozora.KanjiData.Kanji do
  use Ecto.Schema
  import Ecto.Changeset

  alias Aozora.KanjiData.{Radical, Example}

  schema "kanji" do
    field :onyomi, :string
    field :kunyomi, :string
    field :character, :string, max: 1
    field :en_meaning, :string
    field :stroke_count, :integer, default: 1, min: 1, max: 99
    field :jlpt, :integer, min: 1, max: 5
    field :grade, :integer, min: 1, max: 12
    field :kodansha, :integer
    field :wanikani, :integer
    field :frequency, :integer
    field :classic_nelson, :integer
    field :naritachi, :integer, min: 1, max: 4
    # 1 = shokeimoji (pictogram)
    # 2 = shijimoji (diagrammatic)
    # 3 = kai-i moji (compound-semantic)
    # 4 = keiseimoji (phonetic-semantic)
    # field :radical_types, :integer
    # list: 1,2,2
    # 1: "semantic" || 2: "phonetic"
    # field :radical_positions, :integer

    # embeds_one :metadata, Aozora.KanjiData.Metadata, on_replace: :update

    many_to_many :radicals, Radical, join_through: "kanji_radicals", on_replace: :delete
    many_to_many :examples, Example, join_through: "kanji_examples", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(kanji, attrs) do
    # |> cast_embed([:metadata, :radical_info])
    kanji
    |> cast(attrs, [:character, :en_meaning, :stroke_count, :onyomi, :kunyomi, :jlpt, :grade, :kodansha, :wanikani, :frequency, :classic_nelson, :naritachi])
    |> validate_required([:character])
    |> validate_length(:character, max: 1)
    |> validate_number(:stroke_count, greater_than: 0, less_than: 100)
    |> unique_constraint(:character, message: "Character already exists")
    |> cast_assoc(:radicals)
  end
end
