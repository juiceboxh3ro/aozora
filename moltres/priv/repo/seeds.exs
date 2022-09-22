# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Aozora.Repo.insert!(%Aozora.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# json_file = "#{__DIR__}/seed_data/sample.json"
json_file = "#{__DIR__}/seed_data/sample.json"

alias Aozora.{Repo, KanjiData}

with {:ok, body} <- File.read(json_file),
     {:ok, json} <- Jason.decode(body, keys: :atoms) do
      Enum.each(json, (fn kanji_seed ->
        %{
          kanji: kanji,
          examples: examples,
          radical: radical,
          references: references,
        } = kanji_seed

        %{
          character: character,
          meaning: meaning,
          kunyomi: kunyomi,
          onyomi: onyomi,
          strokes: strokes,
          video: _video,
        } = kanji
        %{ english: english } = meaning
        %{ hiragana: hiragana, romaji: _romaji } = kunyomi
        %{ katakana: katakana, romaji: _romaji } = onyomi
        %{ count: count } = strokes
        %{ grade: grade, kodansha: kodansha } = references

        kanji_kun = String.replace(hiragana, "n/a", "")
        kanji_on = String.replace(katakana, "n/a", "")

        kanji_kodansha =
          kodansha
          |> String.replace("n/a", "0")
          |> String.to_integer()

        kanji_changeset = %KanjiData.Kanji{
          character: character,
          en_meaning: english,
          kunyomi: kanji_kun,
          onyomi: kanji_on,
          stroke_count: count,
          grade: grade,
          kodansha: kanji_kodansha,
        }

        inserted_kanji = Repo.insert!(kanji_changeset)
      end))
else
  err ->
      IO.inspect(err)
end
