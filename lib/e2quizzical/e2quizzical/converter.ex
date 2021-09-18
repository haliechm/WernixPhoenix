defmodule E2Quizzical.Converter do
  require Logger
  import Ecto.Query, warn: false

  @utc "Etc/UTC"

  def site_url do
    raw_url = E2QuizzicalWeb.Endpoint.url()

    url_segments =
      raw_url
      |> String.split(":")

    case length(url_segments) do
      2 -> Enum.at(url_segments, 0)
      3 -> Enum.at(url_segments, 0) <> ":" <> Enum.at(url_segments, 1)
      # something else we didn't anticipate
      _ -> raw_url
    end
  end

  def force_int(nil), do: nil
  def force_int(""), do: nil
  def force_int(v) when is_binary(v), do: String.to_integer(v)
  def force_int(v), do: v

  def string_keys_to_atoms(list) do
    Enum.map(list, fn row ->
      Map.new(row, fn kv = {k, v} ->
        if is_binary(k) do
          {String.to_atom(k), v}
        else
          kv
        end
      end)
    end)
  end

  def to_x_or_blank(nil), do: nil
  def to_x_or_blank(b) when is_boolean(b), do: if(b, do: "X", else: "")

  def less_than_x_minutes_ago(nil, _minutes), do: false
  def less_than_x_minutes_ago(dttm, minutes) do
    point =
      :calendar.universal_time()
      |> Timex.to_datetime(@utc)
      |> Timex.shift(minutes: -1 * minutes)

    Timex.after?(dttm, point)
  end

  def to_page_info(page) do
    %{
      page_number: page.page_number,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_count: page.total_entries
    }
  end

  def filter_list_to_map(filters) when is_list(filters) do
    list_to_map(%{}, filters)
  end
  def filter_list_to_map(filters), do: filters

  def list_to_map(m, []), do: m
  def list_to_map(m, [f | tail]) do
    key = Map.get(f, "filterName")
    value = Map.get(f, "value")
    m
    |> Map.put(key, value)
    |> list_to_map(tail)
  end

  def to_ymd_string(erl_dttm) do
    Timex.format!(erl_dttm, "%Y-%m-%d", :strftime)
  end

  def current_datetime_string do
    now()
    |> Timex.format!("{YYYY}-{0M}-{0D}T{h24}:{m}:{s}.000Z")
  end

  def now do
    DateTime.truncate(DateTime.utc_now(), :second)
  end

  def today_start_of_day do
    {dt, _tm} =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.to_erl()

    {dt, {0, 0, 0}}
    |> NaiveDateTime.from_erl!()
  end

  def x_days_in_the_future(days) do
    :calendar.universal_time()
    |> Timex.to_datetime(@utc)
    |> Timex.shift(days: days)
  end

  def tomorrow_ymd do
    {dt, _tm} =
      NaiveDateTime.utc_now()
      # 18 hours
      |> NaiveDateTime.add(64_800, :second)
      |> NaiveDateTime.to_erl()

    {dt, {0, 0, 0}}
    |> NaiveDateTime.from_erl!()
  end

  def tomorrow_ymd_string do
    tomorrow_ymd()
    |> Timex.format!("%Y-%m-%d", :strftime)
  end

  def to_db_format(nil), do: nil
  def to_db_format({{y, mn, dy}, {hh, mm, ss, _}}), do: to_db_format({{y, mn, dy}, {hh, mm, ss}})

  def to_db_format(dttm = %DateTime{}) do
    dttm
    |> Timex.Timezone.convert(@utc)
    |> Timex.format!("{ISO:Extended}")
  end

  def to_db_format(erl_dt = {{_y, _mn, _dy}, {_hh, _mm, _ss}}) do
    erl_dt
    |> Timex.Timezone.convert(@utc)
    |> Timex.format!("{ISO:Extended}")
  end

  def from_naive(date_time) do
    DateTime.from_naive!(date_time, @utc)
  end

  def mdy_to_datetime(nil), do: nil
  def mdy_to_datetime(mdy) do
    mdy
    |> Timex.parse!("%m/%d/%Y", :strftime)
  end

  def ymd_to_datetime(ymd) when is_nil(ymd) or ymd == "", do: nil
  def ymd_to_datetime(ymd), do: Timex.parse!(ymd, "%Y-%m-%d", :strftime)

  def ymdhm_to_datetime(ymdhm, from_timezone \\ nil)
  def ymdhm_to_datetime(nil, _from_timezone), do: nil
  def ymdhm_to_datetime(ymdhm, from_timezone) do
    dttm =
      ymdhm
      |> Timex.parse!("%Y-%m-%d %H:%M", :strftime)

    case from_timezone do
      nil ->
        dttm

      _ ->
        Timex.to_datetime(dttm, from_timezone)
        |> Timex.Timezone.convert(@utc)
        |> DateTime.to_naive()
    end
  end

  def add_keys_if_missing(m, []), do: m
  def add_keys_if_missing(m, [string_key | tail]) do
    if !Map.has_key?(m, string_key) && !Map.has_key?(m, String.to_atom(string_key)) do
      Map.put(m, string_key, nil)
    else
      m
    end
    |> add_keys_if_missing(tail)
  end

  def nulls_to_zero(params, []), do: params
  def nulls_to_zero(params, [field | tail]) do
    if Map.has_key?(params, field) && (is_nil(params[field]) || params[field] == "") do
      Map.put(params, field, 0)
    else
      params
    end
    |> nulls_to_zero(tail)
  end

  def nulls_to_false(params, []), do: params
  def nulls_to_false(params, [field | tail]) do
    if Map.has_key?(params, field) && (is_nil(params[field]) || params[field] == "") do
      Map.put(params, field, false)
    else
      params
    end
    |> nulls_to_false(tail)
  end

  def to_user_timezone(dttm = %DateTime{}, olson_timezone) do
    dttm
    |> Timex.to_erl()
    |> to_user_timezone(olson_timezone)
  end
  def to_user_timezone(erl_dt = {{_y, _mn, _dy}, {_hh, _mm, _ss}}, olson_timezone) do
    erl_dt
    |> Timex.to_datetime(@utc)
    |> Timex.to_datetime(olson_timezone)
  end
  def to_user_timezone(dttm, olson_timezone) do
    dttm
    |> NaiveDateTime.to_erl()
    |> to_user_timezone(olson_timezone)
  end

  def to_long_date_display_format(nil), do: ""
  def to_long_date_display_format(naive_date_time),
    do: Timex.format!(naive_date_time, "{WDshort} {0D}-{Mshort}-{YY}")

  def to_date_display_format(nil), do: ""
  def to_date_display_format(dt = %DateTime{}), do: to_date_display_format(DateTime.to_naive(dt))
  def to_date_display_format(naive_date_time),
    do: Timex.format!(naive_date_time, "{0D}-{Mshort}-{YY}")

  def to_display_format(nil, _tz), do: ""
  def to_display_format(dttm = %DateTime{}, olson_timezone),
    do: to_display_format(Timex.to_erl(dttm), olson_timezone)
  def to_display_format({{y, mn, dy}, {hh, mm, ss, _}}, olson_timezone),
    do: to_display_format({{y, mn, dy}, {hh, mm, ss}}, olson_timezone)
  def to_display_format(erl_dt = {{_y, _mn, _dy}, {_hh, _mm, _ss}}, olson_timezone) do
    erl_dt
    |> to_user_timezone(olson_timezone)
    |> Timex.format!("{0D}-{Mshort}-{YY} {0h12}:{m}:{s} {AM}")
  end
  def to_display_format(naive_date_time, olson_timezone) do
    naive_date_time
    |> NaiveDateTime.to_erl()
    |> to_display_format(olson_timezone)
  end

  def to_display_format(nil), do: ""
  def to_display_format(dttm = %DateTime{}), do: to_display_format(Timex.to_erl(dttm))
  def to_display_format({{y, mn, dy}, {hh, mm, ss, _}}),
    do: to_display_format({{y, mn, dy}, {hh, mm, ss}})
  def to_display_format(erl_dt = {{_y, _mn, _dy}, {_hh, _mm, _ss}}) do
    erl_dt
    |> Timex.format!("{0D}-{Mshort}-{YY} {0h12}:{m}:{s} {AM}")
  end
  def to_display_format(naive_date_time) do
    naive_date_time
    |> NaiveDateTime.to_erl()
    |> to_display_format()
  end

  def to_user_time_format(dttm = %DateTime{}, olson_timezone),
    do: to_user_time_format(Timex.to_erl(dttm), olson_timezone)
  def to_user_time_format({{y, mn, dy}, {hh, mm, ss, _}}, olson_timezone),
    do: to_user_time_format({{y, mn, dy}, {hh, mm, ss}}, olson_timezone)
  def to_user_time_format(erl_dt = {{_y, _mn, _dy}, {_hh, _mm, _ss}}, olson_timezone) do
    erl_dt
    |> to_user_timezone(olson_timezone)
    |> Timex.format!("{h12}:{m} {AM}")
  end
  def to_user_time_format(naive_date_time, olson_timezone) do
    naive_date_time
    |> NaiveDateTime.to_erl()
    |> to_user_time_format(olson_timezone)
  end

  def to_short_display_format(dttm = %DateTime{}, olson_timezone),
    do: to_short_display_format(Timex.to_erl(dttm), olson_timezone)
  def to_short_display_format({{y, mn, dy}, {hh, mm, ss, _}}, olson_timezone),
    do: to_short_display_format({{y, mn, dy}, {hh, mm, ss}}, olson_timezone)
  def to_short_display_format(erl_dt = {{_y, _mn, _dy}, {_hh, _mm, _ss}}, olson_timezone) do
    erl_dt
    |> to_user_timezone(olson_timezone)
    |> Timex.format!("{0D}-{Mshort}-{YY} {h12}:{m} {AM}")
  end
  def to_short_display_format(naive_date_time, olson_timezone) do
    naive_date_time
    |> NaiveDateTime.to_erl()
    |> to_short_display_format(olson_timezone)
  end

  def erl_to_date_string(erl_dt_tm) do
    erl_dt_tm
    |> Timex.to_datetime(@utc)
    |> Timex.format!("{0D}-{Mshort}-{YY}")
  end

  def erl_to_date_time_string(erl_dt_tm) do
    erl_dt_tm
    |> Timex.to_datetime(@utc)
    |> Timex.format!("{YYYY}-{0M}-{0D} {h24}:{m}")
  end

  def erl_to_time_string(erl_dt_tm) do
    erl_dt_tm
    |> Timex.to_datetime(@utc)
    |> Timex.format!("{h12}:{m} {am}")
  end

  epoch = {{1970, 1, 1}, {0, 0, 0}}
  @epoch :calendar.datetime_to_gregorian_seconds(epoch)

  def from_timestamp(ts) when is_binary(ts) do
    ts
    |> String.to_integer()
    |> from_timestamp()
  end
  def from_timestamp(timestamp) when is_integer(timestamp) do
    timestamp
    |> Kernel.+(@epoch)
    |> :calendar.gregorian_seconds_to_datetime()
  end

  def to_timestamp(ndt = %NaiveDateTime{}), do: to_timestamp(NaiveDateTime.to_erl(ndt))
  def to_timestamp(erl_datetime) do
    erl_datetime
    |> :calendar.datetime_to_gregorian_seconds()
    |> Kernel.-(@epoch)
  end

  def default_timezone(), do: "America/New_York"

  def valid_timezone_list() do
    [
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "America/New York",
      "America/Los Angeles"
    ]
  end

  def friendly_timezone_name(olson_timezone) do
    case olson_timezone do
      "America/New_York" -> "Eastern"
      "America/Chicago" -> "Central"
      "America/Denver" -> "Mountain"
      "America/Los_Angeles" -> "Pacific"
      "America/New York" -> "Eastern"
      "America/Los Angeles" -> "Pacific"
      _ -> olson_timezone
    end
  end

  defp changeset_error_to_string({message, values}) do
    Enum.reduce(values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end)
  end
  defp changeset_error_to_string(message), do: message

  def changeset_error_message(changeset_error_kwlist) do
    changeset_error_kwlist
    |> Enum.map(fn {field, complaint} -> "#{field}: #{changeset_error_to_string(complaint)}" end)
    |> Enum.join("; ")
  end
end
