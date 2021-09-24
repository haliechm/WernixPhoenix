defmodule E2Quizzical.Message do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false


  @timestamps_opts [type: :utc_datetime]
  schema "messages" do
    belongs_to :created_by, E2Quizzical.User
    # field :created_by_id, :integer
    belongs_to :received_by, E2Quizzical.User
    # field :received_by_id, :integer
    field :content, :string 
    timestamps()
  end

  @available_fields ~w(created_by_id received_by_id content)a

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields)
  end

end
