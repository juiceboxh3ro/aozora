defmodule Aozora.Repo.Migrations.CreateRadicals do
  use Ecto.Migration

  def change do
    create table(:radicals) do
      add :bushu, :string, null: false
      add :en_name, :string
      add :jp_name, :string
      add :meaning, :string
      add :mnemonics, :map, default: %{}

      timestamps()
    end

    create unique_index(:radicals, [:bushu])
  end
end
