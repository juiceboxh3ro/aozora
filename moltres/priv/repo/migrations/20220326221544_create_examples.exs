defmodule Aozora.Repo.Migrations.CreateExamples do
  use Ecto.Migration

  def change do
    create table(:examples) do
      add :japanese, :string
      add :english, :string
      add :other_langs, :map, default: %{}
      add :kanji_id, references(:kanji, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:examples, [:kanji_id])

    alter table(:kanji) do
      modify :character, :string, null: false, size: 1, unique: true
    end

    create unique_index(:kanji, [:character])
  end
end
