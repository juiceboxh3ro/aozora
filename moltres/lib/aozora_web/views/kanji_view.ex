defmodule AozoraWeb.KanjiView do
  use AozoraWeb, :view

  alias AozoraWeb.KanjiView

  def render("index.json", %{kanji: kanji}) do
    %{data: render_many(kanji, KanjiView, "kanji.json")}
  end

  def render("show.json", %{kanji: kanji}) do
    %{data: render_one(kanji, KanjiView, "kanji.json")}
  end

  def render("kanji.json", %{kanji: kanji}) do
    %{
      id: kanji.id,
      character: kanji.character,
      en_meaning: kanji.en_meaning,
      kunyomi: kanji.kunyomi,
      onyomi: kanji.onyomi,
      stroke_count: kanji.stroke_count,
      metadata: %{
        classic_nelson: kanji.metadata.classic_nelson,
        frequency: kanji.metadata.frequency,
        grade: kanji.metadata.grade,
        jlpt: kanji.metadata.jlpt,
        kodansha: kanji.metadata.kodansha,
        naritachi: kanji.metadata.naritachi,
        wanikani: kanji.metadata.wanikani,
      }
    }
  end
end
