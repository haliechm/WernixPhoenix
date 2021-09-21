defmodule E2QuizzicalWeb.AdminController do
  use E2QuizzicalWeb, :controller

  require Logger
  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias E2Quizzical.{Guardian, User, UserRole, Auth, Repo}

  def list_users(conn, params) do
    users = params
      |> User.build_query()
      |> Repo.paginate()
    render(conn, "user_list.json", vm: users)
  end

  def save_user(conn, params = %{"id" => existing_user_id, "username" => username, "roles" => new_role_id_list}) do
    case User.get_user_by_username(username, existing_user_id) do
      nil ->
        Repo.transaction(fn ->
          params = params
            |> Map.drop(["roles"])
            |> Map.put_new("middle_name", "")
          user = 
            if existing_user_id <= 0 do
              %User{}
              |> User.create_changeset(params)
              |> Repo.insert!()
            else
              Repo.get(User, existing_user_id)
              |> User.changeset(params)
              |> Repo.update!()
            end
          UserRole.set_roles(user.id, new_role_id_list, conn.assigns.current_user.id)
        end)
        |> case do
          {:ok, _} ->
            json(conn, %{success: true})
          {:error, err_details} ->
            Logger.error("User could not be found with user_id: #{inspect(existing_user_id)}")
            json(conn, %{success: false, message: "An error occurred while attempting to save the user: #{inspect(err_details)}."})
        end
      _ ->
        message = "A user with the username #{String.downcase(username)} already exists."
        Logger.error(message)
        json(conn, %{success: false, message: message})
    end
  end

  # i guess here params is a map that directly gets the parameters from the url
  def get_user(conn, %{"user_id" => user_id}) do
  	json(conn, User.get_one(user_id))
  end

  def toggle_user_active(conn, %{"id" => id}) do
    Repo.get(User, id)
    |> User.toggle_active_changeset()
    |> Repo.update!()
    json(conn, %{success: true})
  end

  def toggle_user_must_change_password(conn, %{"id" => id}) do
    Repo.get(User, id)
    |> User.changeset(%{must_change_password: false})
    |> Repo.update!()
    json(conn, %{success: true})
  end

  def unlock_user(conn, %{"id" => id}) do
    Repo.get(User, id)
    |> User.unlock()
    |> Repo.update!()
    json(conn, %{success: true})
  end

  def impersonate(conn, %{"id" => id}) do
    id
    |> User.get_one()
    |> case do
      nil ->
        Logger.error("User could not be found with user_id: #{inspect(id)}")
        json(conn, %{success: false, message: "No such user could be found."})

      user_info ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user_info)
        json(conn, %{
          success: true,
          token: jwt, 
          user: user_info,
          message: ""
        })
    end
  end

  # pattern matching here, middle_name not required but might need to access it so that's why we use "raw_params ="
  def save_profile(conn, raw_params = %{"id" => existing_user_id,
      "first_name" => first_name,
      "last_name" => last_name,
      "email" => email,
      "mobile_number" => mobile_number,
      "username" => username
    }) do
    change_params = %{
      "id" => existing_user_id,
      "first_name" => first_name,
      "middle_name" => Map.get(raw_params, "middle_name", ""),
      "last_name" => last_name,
      "email" => email,
      "mobile_number" => mobile_number,
      "username" => username
    }
    # just doing in case image was uploaded
    change_params = 
      raw_params
      |> Map.get("image_url")
      |> case do
        nil ->
          change_params
        img = %{content_type: mime_type} ->
          change_params
          |> Map.put("image_url", img)
          |> Map.put("mime_type", mime_type)
      end
    Repo.get(User, existing_user_id)
    |> User.changeset(change_params)
    |> Repo.update()
    |> case do
      {:ok, updated_user} ->
        json(conn, %{success: true, image_url: User.get_profile_picture_url(updated_user)})
      {:error, err_details} ->
        Logger.error("Failed to update user profile: #{inspect(err_details)}")
        json(conn, %{success: false, message: "An error occurred while attempting to save your profile: #{inspect(err_details)}."})
    end
  end

  def update_password(conn, %{"old_password" => old_pwd, "password" => new_pwd}) do
    conn.assigns.current_user.username
    |> Auth.attempt_login(old_pwd) 
    |> case do
      {:ok, user} ->
        user
        |> User.reset_password_changeset(%{"password" => new_pwd})
        |> Repo.update()
        |> case do
          {:ok, updated_user} ->
            if !is_nil(updated_user.last_locked_out_at) do
              User.unlock(updated_user)
            end
            json(conn, %{success: true})

          {:error, changeset} ->
            error_message = 
              changeset
              |> Map.get(:errors)
              |> Enum.map(fn {_field, detail} -> render_error_detail(detail) end)
              |> Enum.join("; ")
            json(conn, %{success: false, message: "Could not reset your password - please validate your entries: #{error_message}"})
         end

      _err ->
        json(conn, %{success: false, message: "Could not reset your password - the provided, current password is incorrect"})

      end
  end

  defp render_error_detail({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end
  defp render_error_detail(message), do: message

  # def list_buildings(conn, params) do
  #   render(conn, "building_list.json", vm: Building.get_all_paginated(params))
  # end

  # def toggle_building_active(conn, %{"id" => id}) do
  #   Building.toggle_active(id)
  #   json(conn, %{success: true})
  # end

  # def save_building(conn, params) do
  #   params
  #   |> Building.save(conn.assigns.current_user.id)
  #   |> case do
  #     {:ok, %{id: new_id}} ->
  #       json(conn, %{success: true, message: new_id})
  #     {:error, reason} ->
  #       Logger.error("Failed to save building: #{inspect(reason)}")
  #       json(conn, %{success: false, message: reason})
  #   end
  # end
end
