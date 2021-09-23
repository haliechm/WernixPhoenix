defmodule E2Quizzical.Message do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false


  @timestamps_opts [type: :utc_datetime]
  schema "messages" do
    field :created_by_id, :integer
    field :received_by_id, :integer
    field :content, :string 
    timestamps()
  end

  @available_fields ~w(created_by_id received_by_id content)a

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields)
  end

end
