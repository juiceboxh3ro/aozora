defmodule Aozora.Repo.Migrations.UpdateRadicalColumns do
  use Ecto.Migration

  def change do
    alter table(:radicals) do
      add :position, :string
      add :stroke_count, :integer, default: 1, min: 1
      add :variant_of, :string
      add :important, :boolean, default: false
    end

    alter table(:kanji) do
      add :radical_info, :map, default: %{}
    end

    alter table(:examples) do
      add :audio_links, :map, default: %{}
    end
  end
end
