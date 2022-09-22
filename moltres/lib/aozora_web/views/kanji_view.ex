defmodule AozoraWeb.KanjiView do
  use AozoraWeb, :view

  alias AozoraWeb.KanjiView

  def render("index.json", %{kanji: kanji}) do
    %{kanji: render_many(kanji, KanjiView, "kanji.json")}
  end

  def render("show.json", %{kanji: kanji}) do
    %{kanji: render_one(kanji, KanjiView, "kanji.json")}
  end

  def render("kanji.json", %{kanji: kanji}) do
    %{
      id: kanji.id,
      inserted_at: kanji.inserted_at,
      updated_at: kanji.updated_at,
      character: kanji.character,
      en_meaning: kanji.en_meaning,
      kunyomi: kanji.kunyomi,
      onyomi: kanji.onyomi,
      stroke_count: kanji.stroke_count,
      study_levels: %{
        classic_nelson: kanji.classic_nelson,
        frequency: kanji.frequency,
        # from_zero: kanji.from_zero_book,
        # genki: kanji.genki_book,
        # tobira: kanji.tobira_book,
        grade: kanji.grade,
        jlpt: kanji.jlpt,
        kodansha: kanji.kodansha,
        wanikani: kanji.wanikani,
      },
      composition_info: %{
        naritachi: kanji.naritachi,
        radicals: render_many(kanji.radicals, RadicalView, "radical.json")
      },
      examples: render_many(kanji.examples, ExampleView, "example.json"),
    }
  end
end
