defmodule E2QuizzicalWeb.ReferenceController do
  use E2QuizzicalWeb, :controller
  import Ecto.{Query}, warn: false

  alias E2Quizzical.{ Repo, Building, Converter }

  def get_ref_data_list(conn, %{"table_name" => table_name}) when table_name == "buildings" do
		list = 
			Building
			|> where([s], is_nil(s.deactivated_at))
			|> select([s], %{value: s.id, label: s.name})
			|> order_by([s], s.name)
			|> Repo.all()

    render(conn, "reference_types.json", list: list)
  end
end
