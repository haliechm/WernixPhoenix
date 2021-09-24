defmodule E2Quizzical.Friendship do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false


  @timestamps_opts [type: :utc_datetime]
  schema "friendships" do
    # field :friend_1_id, :integer
    belongs_to :friend_1, E2Quizzical.User
    # field :friend_2_id, :integer
    belongs_to :friend_2, E2Quizzical.User
    timestamps()
  end

  @available_fields ~w(friend_1_id friend_2_id)a

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields)
    |> unique_constraint([:friend_1_id, :friend_2_id], message: "Friendship already exists.")
  end

end
