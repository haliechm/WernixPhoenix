defmodule E2QuizzicalWeb.AdminView do
  use E2QuizzicalWeb, :view

  alias E2Quizzical.{Converter}

  def render("user_list.json", %{vm: paged_users}) do
    %{
      paged_list: %{
        list: Enum.map(paged_users.entries, fn u -> 
          %{
            id: u.id,
            first_name: u.first_name,
            last_name: u.last_name,
            username: u.username,
            roles: String.split(u.roles, ","),
            must_change_password: u.must_change_password, 
            last_locked_out_at: Converter.to_display_format(u.last_locked_out_at, Converter.default_timezone()), 
            last_login_at: Converter.to_display_format(u.last_login_at, Converter.default_timezone()),
            deactivated_at: u.deactivated_at
          }
        end),
        page_number: paged_users.page_number,
        page_size: paged_users.page_size,
        total_pages: paged_users.total_pages,
        total_entries: paged_users.total_entries
      }
    }
  end

  def render("sector_list.json", %{vm: paged_list}) do
    %{
      paged_list: %{
        list: Enum.map(paged_list.entries, fn u -> 
          %{
            id: u.id,
            name: u.name,
            user_csv: u.user_csv,
            dock_name_csv: u.dock_name_csv,
            deactivated_at: u.deactivated_at
          }
        end),
        page_number: paged_list.page_number,
        page_size: paged_list.page_size,
        total_pages: paged_list.total_pages,
        total_entries: paged_list.total_entries
      }
    }
  end

  def render("dock_list.json", %{vm: paged_list, all_buildings: all_buildings, all_modifiers: all_modifiers}) do
    %{
      paged_list: %{
        list: Enum.map(paged_list.entries, fn u -> 
          %{
            id: u.id,
            name: u.name,
            building_id: u.building_id,
            building_name: u.building_name,
            modifier_csv: u.modifier_csv,
            modifier_id_list: u.modifier_id_list,
            status_option_csv: u.status_option_csv,
            deactivated_at: u.deactivated_at
          }
        end),
        page_number: paged_list.page_number,
        page_size: paged_list.page_size,
        total_pages: paged_list.total_pages,
        total_entries: paged_list.total_entries
      },
      all_buildings: Enum.map(all_buildings, &simple_item/1),
      all_modifiers: Enum.map(all_modifiers, &simple_item/1)
    }
  end

  def render("list.json", %{vm: paged_list}) do
    %{
      paged_list: %{
        list: Enum.map(paged_list.entries, &simple_item/1),
        page_number: paged_list.page_number,
        page_size: paged_list.page_size,
        total_pages: paged_list.total_pages,
        total_entries: paged_list.total_entries
      }
    }
  end

  def render("building_list.json", %{vm: paged_list}) do
    %{
      paged_list: %{
        list: Enum.map(paged_list.entries, fn x ->
          %{
            id: x.id,
            name: x.name,
            status_option_csv: x.status_option_csv,
            deactivated_at: x.deactivated_at
          }
        end),
        page_number: paged_list.page_number,
        page_size: paged_list.page_size,
        total_pages: paged_list.total_pages,
        total_entries: paged_list.total_entries
      }
    }
  end

  def render("flag_list.json", %{vm: paged_list}) do
    %{
      paged_list: %{
        list: Enum.map(paged_list.entries, fn x ->
          %{
            id: x.id,
            name: x.name,
            color_class_name: x.color_class_name,
            icon_name: x.icon_name,
            deactivated_at: x.deactivated_at,
            escalated_notification_only: x.escalated_notification_only
          }
        end),
        page_number: paged_list.page_number,
        page_size: paged_list.page_size,
        total_pages: paged_list.total_pages,
        total_entries: paged_list.total_entries
      }
    }
  end

  defp simple_item(x) do
  	%{
  		id: x.id,
  		name: x.name,
      deactivated_at: x.deactivated_at
  	}
  end
end