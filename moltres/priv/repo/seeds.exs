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
        %{ classic_nelson: classic_nelson, grade: grade, kodansha: kodansha } = references

        kanji_kun = String.replace(hiragana, "n/a", "")
        kanji_on = String.replace(katakana, "n/a", "")

        kanji_kodansha =
          kodansha
          |> String.replace("n/a", "0")
          |> String.to_integer()

        kanji_nelson =
          classic_nelson
          |> String.replace("n/a", "0")
          |> String.to_integer()

        kanji_changeset = %KanjiData.Kanji{
          character: character,
          en_meaning: english,
          kunyomi: kanji_kun,
          onyomi: kanji_on,
          stroke_count: count,
          classic_nelson: kanji_nelson,
          grade: grade,
          kodansha: kanji_kodansha,
        }

        inserted_kanji = Repo.insert!(kanji_changeset)
        IO.inspect(inserted_kanji)

        inserted_examples =
          examples
          |> Enum.map(& %KanjiData.Example{ japanese: &1.japanese, english: &1.meaning.english })
          |> Enum.each(& Repo.insert!(&1))
        IO.inspect(inserted_examples)

        %{
          character: rad_char,
          meaning: rad_meaning,
          name: rad_name,
          position: rad_position,
          strokes: rad_strokes,
        } = radical

        %{ english: rad_english } = rad_meaning
        %{ hiragana: rad_jp_name } = rad_name
        %{ hiragana: rad_pos_hira } = rad_position

        rad_changeset = %KanjiData.Radical{
          bushu: rad_char,
          meaning: rad_english,
          jp_name: rad_jp_name,
          position: rad_pos_hira,
          stroke_count: rad_strokes
        }

        inserted_radical = Repo.insert!(rad_changeset)
        IO.inspect(inserted_radical)

        # do
          # examples
          # |> Enum.map(& %{ japanese: &1.japanese, english: &1.meaning.english })
          # |> Enum.each(& Aozora.KanjiData.create_example(%{ example: &1, kanji: k }))

          # Aozora.KanjiData.create_radical(%{ radical: rad_changeset, kanji: k })
        # end

        # unless existing_radical do
        #   rad_changeset
        #   |> Aozora.KanjiData.create_radical()
        #   |> Aozora.KanjiData.update_radical(%{ "kanji" => [k.id] })
        # else
        #   Aozora.KanjiData.update_radical(existing_radical, %{ kanji: [k.id]})
        # end
      end))
else
  err ->
      IO.inspect(err)
end
