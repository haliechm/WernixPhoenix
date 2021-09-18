defmodule E2Quizzical.LogonAttempt do
  use E2QuizzicalWeb, :model
  import Ecto.{Query, Changeset}, warn: false
  alias E2Quizzical.Converter

  schema "logon_attempts" do
    field :occurred_at, :utc_datetime
    field :username, :string
    field :ip_address, :string
    field :was_successful, :boolean
  end

  def changeset(model) do
    model
    |> Ecto.Changeset.change()
    |> put_change(:occurred_at, Converter.now)
  end
end