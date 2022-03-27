defmodule Aozora.KanjiData.Metadata do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field :jlpt, :integer
    field :grade, :integer
    field :kodansha, :integer
    field :wanikani, :integer
    field :frequency, :integer
    field :naritachi, :integer
    field :classic_nelson, :integer
  end

  @doc false
  def changeset(option, attrs) do
    option
    |> cast(attrs, [:grade, :kodansha, :classic_nelson, :naritachi, :wanikani, :jlpt, :frequency])
    |> validate_required([])
  end
end
