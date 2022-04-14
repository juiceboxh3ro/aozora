defmodule Aozora.Repo.Migrations.UpdateRadicalColumnsMoreLanguages1 do
  use Ecto.Migration

  def change do
    alter table(:radicals) do
      add :frequency, :integer, default: 1, min: 1
      add :hangul, :string
      add :han_viet, :string
      add :pinyin, :string
      add :number, :integer, default: 1, min: 1, max: 214
      add :simplified, :string

      remove :variant_of
      add :variant, :string
    end
  end
end
