defmodule Aozora.Repo.Migrations.UpdateKanjiColumns do
  use Ecto.Migration

  def change do
    alter table(:kanji) do
      add :jlpt, :integer, min: 1, max: 5
      add :grade, :integer, min: 1, max: 12
      add :kodansha, :integer
      add :wanikani, :integer
      add :frequency, :integer
      add :naritachi, :integer, min: 1, max: 4
      # 1 = shokeimoji (pictogram)
      # 2 = shijimoji (diagrammatic)
      # 3 = kai-i moji (compound-semantic)
      # 4 = keiseimoji (phonetic-semantic)
      add :classic_nelson, :integer

      add :radical_types, :integer
      # list: 1,2,2
      # 1: "semantic" || 2: "phonetic"
      add :radical_positions, :integer
      # list per radical: 1,4,3
      # 1: "hen", 2: "tsukuri", 3: "kanmuri", 4: "ashi", 5: "tare", 6: "nyou", 7~13: "kamae"
      # kamae sub-types:
      # 7 fully enclosed
      # 8 left & right side
      # 9 top
      # 10 top & left & bottom
      # 11 top & right
      # 12 z shape
      # 13 inverse 凸

      remove :metadata
      remove :radical_info
    end

    alter table(:radicals) do
      remove :mnemonics
    end
  end
end
