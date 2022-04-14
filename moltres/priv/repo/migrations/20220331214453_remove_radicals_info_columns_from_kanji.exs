defmodule Aozora.Repo.Migrations.RemoveRadicalsInfoColumnsFromKanji do
  use Ecto.Migration

  def change do
    alter table(:kanji) do
      remove :radical_types, :integer
      remove :radical_positions, :integer
    end

    drop unique_index(:examples, [:kanji_id])
    create index(:examples, [:kanji_id])
  end
end
