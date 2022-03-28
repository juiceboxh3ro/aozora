defmodule AozoraWeb.RadicalView do
  use AozoraWeb, :view
  alias AozoraWeb.RadicalView

  def render("index.json", %{radicals: radicals}) do
    %{data: render_many(radicals, RadicalView, "radical.json")}
  end

  def render("show.json", %{radical: radical}) do
    %{data: render_one(radical, RadicalView, "radical.json")}
  end

  def render("radical.json", %{radical: radical}) do
    %{
      id: radical.id,
      bushu: radical.bushu,
      jp_name: radical.jp_name,
      en_name: radical.en_name,
      meaning: radical.meaning,
      position: radical.position,
      stroke_count: radical.stroke_count,
      variant_of: radical.variant_of,
      important: radical.important,
    }
  end
end
