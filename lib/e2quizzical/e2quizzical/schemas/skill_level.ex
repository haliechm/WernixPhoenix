defmodule E2Quizzical.SkillLevel do
  use Ecto.Schema
  import Ecto.{Query, Changeset}, warn: false


  @timestamps_opts [type: :utc_datetime]
  schema "skill_levels" do
    field :name, :string
    timestamps()
  end

  @available_fields ~w(name)a
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields)
    |> unique_constraint(:name, message: "Skill level already exists.")
  end

end
