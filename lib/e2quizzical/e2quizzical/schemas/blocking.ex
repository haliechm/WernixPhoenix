defmodule E2Quizzical.Blocking do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false


  @timestamps_opts [type: :utc_datetime]
  schema "blockings" do
    belongs_to :blocked_by, E2Quizzical.User
    # field :blocked_by_id, :integer
    belongs_to :blocked, E2Quizzical.User
    # field :blocked_id, :integer
    timestamps()
  end

  @available_fields ~w(blocked_by_id blocked_id)a

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields)
    |> unique_constraint([:blocked_by_id, :blocked_id], message: "Blocking relationship already exists.")
  end

end
