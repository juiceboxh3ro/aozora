defmodule Aozora.KanjiData.Kanji do
  use Ecto.Schema
  import Ecto.Changeset

  schema "kanji" do
    field :character, :string, max: 1
    field :en_meaning, :string
    field :stroke_count, :integer, default: 1, min: 1, max: 99
    field :onyomi, :string
    field :kunyomi, :string

    field :joyo, :boolean, default: false
    field :jlpt, :integer, min: 1, max: 5
    field :grade, :integer, min: 1, max: 12
    field :kanken, :integer, min: 1, max: 10

    field :skip, :string
    field :kodansha, :integer
    field :wanikani, :integer
    field :frequency, :integer
    field :naritachi, :integer, min: 1, max: 4
    # 1 = shokeimoji (pictogram)
    # 2 = shijimoji (diagrammatic)
    # 3 = kai-i moji (compound-semantic)
    # 4 = keiseimoji (phonetic-semantic)
    # field :radical_types, :integer
    # list: 1,2,2
    # 1: "semantic" || 2: "phonetic"
    # field :radical_positions, :integer

    timestamps()
  end

  @doc false
  def changeset(kanji, attrs) do
    kanji
    |> cast(attrs, [:character, :en_meaning, :stroke_count, :onyomi, :kunyomi, :jlpt, :grade, :kodansha, :wanikani, :frequency, :naritachi])
    |> validate_required([:character])
    |> validate_length(:character, max: 1)
    |> validate_number(:stroke_count, greater_than: 0, less_than: 100)
    |> unique_constraint(:character, message: "Character already exists")
  end
end
