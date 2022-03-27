defmodule Aozora.KanjiData.RadicalInfo do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :type, :string # "semantic" || "phonetic"
    field :radical_position, :string
    # "hen", "tsukuri", "kanmuri", "ashi", "kamae1-7", "tare", "nyou"
    # kamae sub-types:
    # 1 fully enclosed
    # 2 left & right side
    # 3 top
    # 4 top & left & bottom
    # 5 top & right
    # 6 z shape
    # 7 inverse 凸
  end

  @doc false
  def changeset(option, attrs) do
    option
    |> cast(attrs, [:type, :radical_position])
    |> validate_required([])
  end
end
