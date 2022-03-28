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

json_file = "#{__DIR__}/seed_data/sample.json"

with {:ok, body} <- File.read(json_file),
     {:ok, json} <- Jason.decode(body, keys: :atoms) do
  # insert to db
      %{ kanji: kanji, examples: examples, radical: radical, references: references } = json
      # %{ character: character, kunyomi: kunyomi, onyomi: onyomi, strokes: strokes } = kanji

      %{ character: character, meaning: meaning, kunyomi: kunyomi, onyomi: onyomi, strokes: strokes, video: _video } = kanji
      %{ english: english } = meaning
      %{ hiragana: hiragana, romaji: _romaji } = kunyomi
      %{ katakana: katakana, romaji: _romaji } = onyomi
      %{ count: count } = strokes

      %{ character: character, meaning: meaning, name: name, position: position, strokes: strokes } = radical
      %{ english: english } = meaning
      %{ hiragana: name } = name
      %{ hiragana: position } = position

      %{ classic_nelson: classic_nelson, grade: grade, kodansha: kodansha } = references

      # TODO:
      # get radical ID, save to KanjiData
      # create kanjiData, loop through examples and add kanjiData ID to each and save

      # TODO:
      # add logic for kanji_radicals intermediary table

      # {:ok, r} = Aozora.KanjiData.Radical.insert(radical_changeset)

      {:ok, k} = Aozora.KanjiData.create_kanji(%{ character: character, kunyomi: hiragana, onyomi: katakana, strokes: count, classic_nelson: classic_nelson, grade: grade, kodansha: kodansha })

      # for ex <- examples do
      #   examples_changeset = %{ japanese: ex.japanese, english: ex.meaning.english }
      #   {:ok, e} = Aozora.KanjiData.Example.insert!(examples_changeset)
      # end
else
  err ->
      IO.inspect(err)
end
