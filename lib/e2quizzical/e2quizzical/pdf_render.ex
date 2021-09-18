defmodule E2Quizzical.PDFRender do
  require Logger
  @doc """
  Takes in a template path that exists in the configured Azure blob storage area and a map containing key-value pairs
  appropriate to filling the template.  It then interacts with an Azure function using iTextSharp to render the PDF
  into a new PDF file.  The new PDF file is stored in the same Azure bucket.  The result of the function call is the new file's key.

  ## Parameters

  - `template_name` - the key of the template PDF to be used
  - `data` - a simple 1-level map whose keys are field names in the PDF template and whose values are to be placed into those fields 

  ## Example
  Given the following input:
  iex> data = %{curds: "Yes", whey: "Yes", spider: true}
  iex> new_key = render_from_template("template/miss-muffet.pdf", data)

  ...something like the following will result:
  `{:ok, "823748927394879234.pdf"}`
  or
  `{:error, "curds and whey everywhere!"}`
  """
  def render_from_template(template_name, data) do
    json = %{ 
      template_asset_key: template_name, 
      output_bucket_name: Application.get_env(:e2quizzical, :azure_receipt_bucket_name), 
      render_with_data: data 
    }
      |> Poison.encode!()
    Application.get_env(:e2quizzical, :azure_function_path)
    |> HTTPoison.post(json, [{"Content-Type", "application/json"}], recv_timeout: 60_000)
    |> case do
      {:ok, response} ->
        %HTTPoison.Response{body: result_json} = response
        case Poison.decode!(result_json) do
          %{"success" => false, "message" => reason} -> {:error, reason}
          %{"output_asset_key" => key} -> {:ok, key}
        end
      {:error, error} ->
      	error_string = IO.inspect(error)
        Logger.error("Error attempting to render PDF: #{error_string}")
        {:error, error_string}
    end
  end

  def render_paged_from_template(template_name, data_rows, header_data) do
    json = %{ 
      template_asset_key: template_name, 
      output_bucket_name: Application.get_env(:e2quizzical, :azure_receipt_bucket_name), 
      render_with_data_rows: data_rows,
      data_records_per_page: 2,
      render_with_header_data: header_data
    }
    |> Poison.encode!()
    Application.get_env(:e2quizzical, :azure_paged_function_path)
    |> HTTPoison.post(json, [{"Content-Type", "application/json"}], recv_timeout: 60_000)
    |> case do
      {:ok, response} ->
        %HTTPoison.Response{body: result_json} = response
        case Poison.decode!(result_json) do
          %{"success" => false, "message" => reason} -> {:error, reason}
          %{"output_asset_key" => key} -> {:ok, key}
        end
      {:error, error} ->
        Logger.error("Error attempting to render paged PDF: #{inspect(error)}")
        {:error, "failed to generate paged pdf - see the error log"}
    end
  end
end