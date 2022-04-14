defmodule Aozora.Repo.Migrations.ChangeKanjiExamplesRelationship do
  use Ecto.Migration

  def change do
    create table(:kanji_examples, primary_key: false) do
      add :kanji_id, references(:kanji, on_delete: :delete_all), null: false
      add :example_id, references(:examples, on_delete: :delete_all), null: false
    end

    alter table(:examples) do
      remove :kanji_id
      remove :other_langs
      remove :audio_links
    end

    create index(:kanji_examples, [:kanji_id])
    create index(:kanji_examples, [:example_id])

    create unique_index(:examples, [:japanese])
    create unique_index(:kanji_examples, [:kanji_id, :example_id])
  end
end
