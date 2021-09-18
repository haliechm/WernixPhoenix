defmodule E2Quizzical.Attachment do
  use Arc.Definition
  use Arc.Ecto.Definition

@extension_whitelist ~w(.jpg .jpeg .png .gif)

  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname() |> String.downcase()
    Enum.member?(@extension_whitelist, file_extension)
  end

  def storage_dir(_version, {file, scope}) do
    "photos/#{scope.id}"
  end

  # bucket_name = Application.get_env(:arc, :bucket)
  # file_name = file_location <> "_n.jpg"
  # {:ok, signed_url} = ExAws.Config.new(:s3)
  # |> ExAws.S3.presigned_url(:get, bucket_name, file_name, [expires_in: 86400])    
end
