defmodule Aozora.Repo.Migrations.CreateKanji do
  use Ecto.Migration

  def change do
    create table(:kanji) do
      add :character, :string, null: false
      add :en_meaning, :string
      add :stroke_count, :integer, default: 1
      add :onyomi, :string
      add :kunyomi, :string
      add :metadata, :map, default: %{}

      timestamps()
    end
  end
end
