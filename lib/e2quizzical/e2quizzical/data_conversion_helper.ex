defmodule E2Quizzical.DataConversionHelper do
  def list_of_maps_to_csv_string(
        list_of_maps,
        conversion_callback \\ nil,
        key_list \\ nil,
        add_header \\ true
      )

  def list_of_maps_to_csv_string([], _, _, _), do: ""
  def list_of_maps_to_csv_string(nil, _, _, _), do: ""

  def list_of_maps_to_csv_string(
        list_of_maps,
        conversion_callback,
        string_key_list,
        add_header
      ) do
    first_data_row_keys =
      list_of_maps
      |> Enum.at(0)
      |> Map.keys()

    data_has_string_keys = first_data_row_keys
      |> Enum.at(0)
      |> is_binary()

    string_key_list =
      if is_nil(string_key_list) do
        if data_has_string_keys do
          first_data_row_keys
        else
          first_data_row_keys
          |> Enum.map(&Atom.to_string/1)
        end
      else
        string_key_list
      end

    reverse_string_key_list = Enum.reverse(string_key_list)

    list_of_maps
    |> Enum.map(fn row ->
      field_ordered_row_list = reorder_map(row, reverse_string_key_list, data_has_string_keys, [])
      if is_nil(conversion_callback) do
        Enum.map(field_ordered_row_list, fn {_k, v} -> v end)
      else
        field_ordered_row_list
        |> convert_row(conversion_callback)
      end
    end)
    |> (fn data_list_of_list ->
          if add_header do
            [string_key_list | data_list_of_list]
          else
            data_list_of_list
          end
        end).()
    |> CSV.encode()
    |> Enum.to_list()
    |> to_string()
  end

  defp reorder_map(_m, [], _data_has_string_keys, result), do: result
  defp reorder_map(m, [key | tail], data_has_string_keys, result) do
    atom_key = String.to_atom(key)
    value =
      if data_has_string_keys do
        Map.get(m, key)
      else
        Map.get(m, atom_key)
      end
    new_result = [{atom_key, value} | result]
    reorder_map(m, tail, data_has_string_keys, new_result)
  end

  def keyword_list_to_csv_string(
        list_of_maps,
        conversion_callback \\ nil,
        key_list \\ nil,
        add_header \\ true
      )

  def keyword_list_to_csv_string([], _, _, _), do: ""
  def keyword_list_to_csv_string(nil, _, _, _), do: ""

  def keyword_list_to_csv_string(
        list_of_maps,
        conversion_callback,
        key_list,
        add_header
      ) do
    first_data_row_keys =
      list_of_maps
      |> Enum.at(0)
      |> Map.keys()

    key_list =
      if is_nil(key_list) do
        first_data_row_keys
        |> Enum.map(fn k ->
          if is_binary(k) do
            k
          else
            Atom.to_string(k)
          end
        end)
      else
        key_list
      end

    list_of_maps
    |> Enum.map(fn row ->
      field_ordered_row = reorder_list(row, Enum.reverse(key_list))
      if is_nil(conversion_callback) do
        Map.values(field_ordered_row)
      else
        field_ordered_row
        |> convert_row(conversion_callback)
      end
    end)
    # |> Enum.reverse()
    |> (fn data_list_of_list ->
          if add_header do
            title = key_list
              |> Enum.map(fn word ->
                word
                |> String.replace("_", " ")
                |> String.upcase()
              end)
            [title | data_list_of_list]
          else
            data_list_of_list
          end
        end).()
    |> CSV.encode()
    |> Enum.to_list()
    |> Enum.map(fn line ->
      # CSV.encode converts some characters that we need to convert back
      line
      |> String.replace("\\n", "\n")
    end)
    |> to_string()
  end

  defp reorder_list(m, string_key_list, result \\ [])
  defp reorder_list(_m, [], result), do: result
  defp reorder_list(m, [key | tail], result) do
    atom_key = String.to_atom(key)
    reorder_list(m, tail, Keyword.put(result, atom_key, m[atom_key]))
  end

  def bool_to_x_or_blank(nil), do: nil
  def bool_to_x_or_blank(b) when is_boolean(b), do: if(b, do: "X", else: "")
  def bool_to_x_or_blank(_), do: "X"

  def force_int(s) do
    if is_binary(s) do
      String.to_integer(s)
    else
      s
    end
  end

  defp convert_row(row_key_value_pairs, conversion_callback, result \\ [])
  defp convert_row([], _, result), do: Enum.reverse(result)

  defp convert_row([{key, value} | tail], conversion_callback, result) do
    convert_row(tail, conversion_callback, [conversion_callback.(key, value) | result])
  end

  def prettify_atom_for_display(atom_name) do
    Atom.to_string(atom_name)
    |> String.split("_", trim: true)
    |> Enum.map(fn x -> :string.titlecase(x) end)
    |> Enum.join(" ")
  end
end
