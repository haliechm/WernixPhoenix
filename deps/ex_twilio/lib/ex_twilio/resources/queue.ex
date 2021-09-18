defmodule ExTwilio.Queue do
  @moduledoc """
  Represents a Queue resource in the Twilio API.

  - [Twilio docs](https://www.twilio.com/docs/voice/api/queue-resource)
  """

  defstruct sid: nil,
            friendly_name: nil,
            current_size: nil,
            max_size: nil,
            average_wait_time: nil

  use ExTwilio.Resource,
    import: [
      :stream,
      :all,
      :find,
      :create,
      :update,
      :destroy
    ]

  def parents, do: [:account]
end
