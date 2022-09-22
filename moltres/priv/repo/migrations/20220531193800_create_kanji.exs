defmodule Aozora.Repo.Migrations.CreateKanji do
  use Ecto.Migration

  def change do
    create table(:kanji) do
      add :character, :string, null: false, size: 1, unique: true
      add :en_meaning, :string
      add :stroke_count, :integer, default: 1
      add :onyomi, :string
      add :kunyomi, :string

      add :joyo, :boolean, default: false
      add :jlpt, :integer, min: 0, max: 5, default: 0
      add :grade, :integer, min: 0, max: 12, default: 0
      add :kanken, :integer, min: 0, max: 10, default: 0

      add :skip, :string
      add :kodansha, :integer
      add :wanikani, :integer
      add :frequency, :integer
      add :naritachi, :integer, min: 1, max: 4
      # 1 = shokeimoji (pictogram)
      # 2 = shijimoji (diagrammatic)
      # 3 = kai-i moji (compound-semantic)
      # 4 = keiseimoji (phonetic-semantic)

      timestamps()
    end
  end
end
