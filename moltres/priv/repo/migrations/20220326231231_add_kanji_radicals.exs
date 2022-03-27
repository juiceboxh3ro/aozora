defmodule Aozora.Repo.Migrations.AddKanjiRadicals do
  use Ecto.Migration

  def change do
    create table(:kanji_radicals, primary_key: false) do
      add :kanji_id, references(:kanji, on_delete: :delete_all), null: false
      add :radical_id, references(:radicals, on_delete: :delete_all), null: false
    end

    create index(:kanji_radicals, [:kanji_id])
    create index(:kanji_radicals, [:radical_id])
    create unique_index(:kanji_radicals, [:kanji_id, :radical_id])
  end
end
