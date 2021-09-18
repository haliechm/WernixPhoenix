defmodule E2QuizzicalWeb.ReferenceView do
  use E2QuizzicalWeb, :view

  def render("reference_types.json", %{list: list}), do: %{list: list}
end
