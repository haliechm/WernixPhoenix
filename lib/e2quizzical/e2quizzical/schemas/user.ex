defmodule E2Quizzical.User do
  use E2QuizzicalWeb, :model
  import Ecto.{Query, Changeset}, warn: false
  use Arc.Ecto.Schema
  alias E2Quizzical.{Repo, User, Converter}

  @timestamps_opts [type: :utc_datetime]

  schema "users" do
    field :first_name, :string
    field :middle_name, :string
    field :last_name, :string
    field :email, :string
    field :username, :string
    field :password, :string, virtual: true
    field :encrypted_password, :string
    field :timezone, :string
    field :last_login_at, :utc_datetime
    field :reset_password_token, Ecto.UUID
    field :reset_password_requested_at, :utc_datetime
    field :last_locked_out_at, :utc_datetime
    field :failed_attempt_count, :integer
    field :must_change_password, :boolean
    field :mobile_number, :string
    field :two_factor_key, :string
    field :two_factor_key_created_at, :utc_datetime
    field :disable_2fa, :boolean
    field :is_admin, :boolean, virtual: true
    field :roles, :string, virtual: true
    field :signed_url, :string, virtual: true
    field :image_url, E2Quizzical.Attachment.Type
    field :mime_type, :string
    field :deactivated_at, :utc_datetime
    belongs_to :deactivated_by_user, E2Quizzical.User
    has_many :user_roles, E2Quizzical.UserRole, on_delete: :delete_all
    timestamps()

    # belongs_to :native_language, E2Quizzical.Language
    # belongs_to :learning_language, E2Quizzical.Language
    field :rating, :float
    field :is_visible, :boolean
    belongs_to :skill_level, E2Quizzical.SkillLevel
    field :is_online, :boolean
    field :birthdate, :date



    has_many :friendships, E2Quizzical.Friendship, on_delete: :delete_all
    has_many :reverse_friendships, E2Quizzical.Friendship, on_delete: :delete_all, foreign_key: :friend_2_id

    has_many :friends, through: [:friendships, :friend_2]
    has_many :reverse_friends, through: [:reverse_friendships, :user]

    # MIGHT NEED TO ADD LIKE HAS_MANY'S FOR WHERE USERS IS THE FOREIGN KEY (many part of one-to-many)

    
  end

  #     add :native_language_id, references(:languages, type: :integer), default: 1, null: false
  #     add :learning_language_id, references(:languages, type: :integer), default: 2, null: false
  #     add :rating, :float, default: 2.5, null: false
  #     add :is_visible, :boolean, default: true, null: false
  #     add :skill_level_id, references(:skill_levels, type: :integer), default: 2, null: false
  #     add :is_online, :boolean, default: true, null: false
  #     add :birthdate, :date, null: true

  # @available_fields ~w(first_name middle_name last_name email username mobile_number timezone mime_type 
  #   reset_password_token reset_password_requested_at must_change_password last_login_at last_locked_out_at 
  #   failed_attempt_count deactivated_at deactivated_by_user_id two_factor_key two_factor_key_created_at disable_2fa
  #   native_language_id learning_language_id rating is_visible skill_level_id is_online birthdate)a
  @available_fields ~w(first_name middle_name last_name email username mobile_number timezone mime_type 
    reset_password_token reset_password_requested_at must_change_password last_login_at last_locked_out_at 
    failed_attempt_count deactivated_at deactivated_by_user_id two_factor_key two_factor_key_created_at disable_2fa
    rating is_visible skill_level_id is_online birthdate)a

  # not entirely clear how this is working - but it is changing the User table?
  # NEED TO UNDERSTAND THIS
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @available_fields, empty_values: [])
    |> cast_attachments(params, [:image_url])
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    |> unique_constraint(:email, message: "Email already taken")
  end

  def create_changeset(model, params \\ :empty) do
    model
    |> changeset(params)
    |> cast(params, ~w(password)a)
    |> validate_length(:password, min: 8, max: 50)
    |> put_pass_hash()
    |> put_change(:failed_attempt_count, 0)
    |> put_change(:timezone, "America/New_York") # while this is not displayed in the UI...
  end

  def create_preliminary(params) do
    User.create_changeset(%User{}, params)
    |> Repo.insert()
  end

  def get_user_by_username(username, existing_user_id \\ nil) do
    lowercase_username = String.downcase(username)
    (from u in User)
    |> where([u], fragment("LOWER(?) = ? and deactivated_at is null", u.username, ^lowercase_username))
    |> or_where([u], fragment("LOWER(?) = ? and deactivated_at is null", u.email, ^lowercase_username))
    |> except_id_filter(%{"except_id" => existing_user_id})
    |> Repo.one()
  end

  def get_user_by_reset_token(token) do
    lowercase_token = String.downcase(token)
    (from u in User)
    |> where([u], fragment("LOWER(cast(? as varchar)) = ? and deactivated_at is null", u.reset_password_token, ^lowercase_token))
    |> Repo.one()
  end

  def set_last_login(model) do
    model
    |> Ecto.Changeset.change()
    |> put_change(:last_login_at, Converter.now())
    |> Repo.update!()
  end

  def clear_failed_login_attempts(model) do
    model
    |> Ecto.Changeset.change()
    |> put_change(:failed_attempt_count, 0)
    |> Repo.update!()
  end

  def forgot_password_changeset(model) do
    model
    |> Ecto.Changeset.change()
    |> put_reset_password_token()
  end

  def reset_password_changeset(model, params) do
    model
    |> create_changeset(params)
    |> clear_reset_password_token()
    |> unlock_changeset()
  end

  def change_password_changeset(model, params) do
    model
    |> create_changeset(params)
  end

  def toggle_active_changeset(model) do
    model
    |> Ecto.Changeset.change()
    |> put_toggle_activity_change(model.deactivated_at == nil)
  end

  def increment_failed_logon_attempt(model, threshold) do
    new_failed_count = model.failed_attempt_count + 1
    model
    |> Ecto.Changeset.change()
    |> put_change(:failed_attempt_count, new_failed_count)
    |> (fn cs ->
      if (new_failed_count >= threshold) do
        put_change(cs, :last_locked_out_at, Converter.now())
      else
        cs
      end
    end).()
    |> Repo.update!()
    cond do
      new_failed_count >= threshold ->
        "Your account has been locked out.  Please wait 5 minutes and try again.  If you have forgotten your password use the forgot password link."
      new_failed_count > 2 ->
        "That's #{new_failed_count} failed logon attempts, after #{threshold} you will be locked out!"
      true -> nil
    end
  end

  def unlock(model) do
    model
    |> Ecto.Changeset.change()
    |> unlock_changeset()
    |> Repo.update!()
  end

  defp put_toggle_activity_change(changeset, was_active) do
    if was_active do
      put_change(changeset, :deactivated_at, Converter.now())
    else
      put_change(changeset, :deactivated_at, nil)
    end
  end

  defp put_reset_password_token(changeset) do
    put_change(changeset, :reset_password_token, UUID.uuid1())
    |> put_change(:reset_password_requested_at, Converter.now())
  end

  defp unlock_changeset(changeset) do
    changeset
    |> put_change(:last_locked_out_at, nil)
    |> put_change(:failed_attempt_count, 0)
  end

  defp clear_reset_password_token(changeset) do
    case changeset do
      %Ecto.Changeset{ errors: [password: _] } ->
        changeset
      _ ->
        put_change(changeset, :reset_password_token, nil)
        |> put_change(:reset_password_requested_at, nil)
    end
  end

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :encrypted_password, Pbkdf2.hash_pwd_salt(pass))
      _ ->
        changeset
    end
  end

  def get_one(id) do
    # build_query(%{"id" => id})
    # |> Repo.one()
    # |> augment_user()

    # retrying here probably wrong:
    build_query2(%{"id" => id})
    |> Repo.one()
    |> augment_user()
  end


  def get_friends(user) do
    # build_query3(%{"id" => id})
    # |> Repo.one()
    # query = from friendship in Friendship
    #         select friendship
#     query = fragment("((select t1.friend1 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.friend_1_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.friend_1_id = ? or f.friend_2_id = ? ) as t1
# where t1.friend1_id != ?

# union 

# select t2.friend2 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.friend_1_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.friend_1_id = ? or f.friend_2_id = ? ) as t2
# where t2.friend2_id != ?))", id, id, id, id, id, id)
#  query = "((select t1.friend1 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.friend_1_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.friend_1_id = ? or f.friend_2_id = ? ) as t1
# where t1.friend1_id != ?

# union 

# select t2.friend2 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.friend_1_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.friend_1_id = ? or f.friend_2_id = ? ) as t2
# where t2.friend2_id != ?))"

    # User 
    # |> select([e], %{



    # })
    # IO.puts("====================================================================================================>")
    # IO.inspect(Repo.all(query))
    # IO.puts("====================================================================================================>")
    # Repo.all(query)
    IO.puts("GETTTTTTTTTTTTTTTTTTTTTTTTTTTTING HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    IO.inspect(user);
    Enum.concat(
      user
      |> Ecto.assoc(:friends)
      |> Repo.all(), 
      
      user
      |> Ecto.assoc(:reverse_friends)
      |> Repo.all()
    )

    # user
    # |> Ecto.assoc(:friends)
    # |> Repo.all()

    # user
    # |> Ecto.assoc(:reverse_friends)
    # |> Repo.all()



#     (from u0 in User)
#     |> join(:inner, [u], f in assoc(u, :friend_2))

# E2Quizzical.UserRole
#     |> join(:inner, [ur], r in assoc(ur, :role))
#     |> where([ur, r], ur.user_id == ^user_id)
#     |> select([ur, r], r.name)
#     |> Repo.all()



#     (from u in User)
#     |> join 
#     |> where([u], is_nil(u.deactivated_at))
#     |> order_by([u], asc: u.first_name, asc: u.last_name)
#     |> select([u], %{
#       id: u.id,
#       name: fragment("concat(?, ' ', ?)", u.first_name, u.last_name)
#     })
#     |> Repo.all()
      
    # Repo.all(Ecto.assoc(CURRENTUSER, :friends))

  end 

  def clean_friend(user) do
    # SKILL LEVEL NOT WORKING FOR CLEAN FRIEND
    # PROBABLY NL AND LL WON'T WORK EITHER 
    IO.puts("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    %{username: user.username, first_name: user.first_name, is_online: user.is_online}
  end

  def clean_friends(list_of_users) do
    IO.puts("***************************************************************")
    Enum.map(list_of_users, fn(user) -> clean_friend(user) end)
    # loop through friends and make map for each with fields: username, **NL**, **LL**, is_online, skill_level, first_name

  end

# Query API
  def apply_sort(query, %{"sort_field" => sort_field_string, "sort_dir" => sort_dir}) do
    dir = case sort_dir do
      "desc" -> :desc
      _ -> :asc
    end
    query
    |> get_sort_clause(dir, sort_field_string)
  end
  def apply_sort(query, %{"sort_field" => sort_field}) do
    apply_sort(query, %{"sort_field" => sort_field, "sort_dir" => "desc"} )
  end
  def apply_sort(query, _params), do: do_apply_sort(query, %{"sort_field" => "last_name", "sort_dir" => "asc"} )

  defp do_apply_sort(query, %{"sort_field" => sort_field_string, "sort_dir" => sort_dir}) do
    dir = case sort_dir do
      "desc" -> :desc
      _ -> :asc
    end
    query
    |> get_sort_clause(dir, sort_field_string)
  end
  defp do_apply_sort(query, %{"sort_field" => sort_field}) do
    do_apply_sort(query, %{"sort_field" => sort_field, "sort_dir" => "asc"} )
  end

  defp get_sort_clause(query, :asc, "last_name"), do: order_by(query, [u, pl], asc: u.last_name)
  defp get_sort_clause(query, :desc, "last_name"), do: order_by(query, [u, pl], desc: u.last_name)

  def get_all_light_list() do
    (from u in User)
    |> where([u], is_nil(u.deactivated_at))
    |> order_by([u], asc: u.first_name, asc: u.last_name)
    |> select([u], %{
      id: u.id,
      name: fragment("concat(?, ' ', ?)", u.first_name, u.last_name)
    })
    |> Repo.all()
  end

  def build_query(params) do
    (from u in User)
    |> query_builder(params)
    |> apply_sort(params)
    |> select([u], %{
      id: u.id,
      deactivated_at: u.deactivated_at,
      email: u.email,
      native_language: u.native_language_id,
      username: u.username,
      first_name: u.first_name,
      middle_name: u.middle_name,
      last_name: u.last_name,
      rating: u.rating,
      last_login_at: u.last_login_at,
      failed_attempt_count: u.failed_attempt_count,
      last_locked_out_at: u.last_locked_out_at,
      roles: fragment("((SELECT array_to_string(array(
          SELECT rl.name
          FROM roles rl INNER JOIN user_roles ur ON ur.role_id = rl.id
          WHERE ur.user_id = ?
            AND ur.deactivated_at is null), ',')))", u.id),
      timezone: u.timezone,
      reset_password_token: u.reset_password_token,
      updated_at: u.updated_at,
      inserted_at: u.inserted_at,
      must_change_password: u.must_change_password,
      # two_factor_key: u.two_factor_key,
      # two_factor_key_created_at: u.two_factor_key_created_at,
      # disable_2fa: u.disable_2fa,
      mobile_number: u.mobile_number,
      image_url: u.image_url,
      mime_type: u.mime_type
    })
  end

  

  def build_query2(params) do
    (from u in User)
    |> query_builder(params)
    |> apply_sort(params)
    # |> join(:inner, [u], nl in assoc(u, :native_language))
    # |> join(:inner, [u, nl], ll in assoc(u, :learning_language))
    # |> select([u, nl, ll], %{
    |> select([u], %{
      id: u.id,
      deactivated_at: u.deactivated_at,
      email: u.email,
      # native_language: nl.name,
      # learning_language: ll.name,
      username: u.username,
      rating: u.rating,
      first_name: u.first_name,
      middle_name: u.middle_name,
      last_name: u.last_name,
      rating: u.rating,
      last_login_at: u.last_login_at,
      failed_attempt_count: u.failed_attempt_count,
      last_locked_out_at: u.last_locked_out_at,
      roles: fragment("((SELECT array_to_string(array(
          SELECT rl.name
          FROM roles rl INNER JOIN user_roles ur ON ur.role_id = rl.id
          WHERE ur.user_id = ?
            AND ur.deactivated_at is null), ',')))", u.id),
#       friends: fragment("((select array_to_string(array(select t1.friend1 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.friend_1_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.friend_1_id = ? or f.friend_2_id = ? ) as t1
# where t1.friend1_id != ?

# union 

# select t2.friend2 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.friend_1_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.friend_1_id = ? or f.friend_2_id = ? ) as t2
# where t2.friend2_id != ?), ',')))", u.id, u.id, u.id, u.id, u.id, u.id),
# friends: fragment("((select array_to_string(array(select t1.friend1 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.user_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.user_id = ? or f.friend_2_id = ? ) as t1
# where t1.friend1_id != ?

# union 

# select t2.friend2 as friend_username from
# (select u01.id as FRIEND1_ID, u01.username as FRIEND1, u02.id as FRIEND2_ID, u02.username as FRIEND2
# from users u01
# inner join friendships f on u01.id = f.user_id
# inner join users u02 on u02.id = f.friend_2_id
# where f.user_id = ? or f.friend_2_id = ? ) as t2
# where t2.friend2_id != ?), ',')))", u.id, u.id, u.id, u.id, u.id, u.id),
 
      timezone: u.timezone,
      reset_password_token: u.reset_password_token,
      updated_at: u.updated_at,
      inserted_at: u.inserted_at,
      must_change_password: u.must_change_password,
      # two_factor_key: u.two_factor_key,
      # two_factor_key_created_at: u.two_factor_key_created_at,
      # disable_2fa: u.disable_2fa,
      mobile_number: u.mobile_number,
      image_url: u.image_url,
      mime_type: u.mime_type
    })
  end

  # def build_query3(params) do
  #   (from u in User) 
  #   |> query_builder(params)
  #   |> apply_sort(params)
  #   |> join

  # end

  def get_profile_picture_url(%{image_url: u}) when is_nil(u), do: nil
  def get_profile_picture_url(model) do
    E2Quizzical.Attachment.url({model.image_url, model},
      signed: true,
      expires_in: 86400 # 18000
    )
  end

  defp augment_user(user) do
    role_list = String.split(user.roles, ",")
    is_admin = Enum.member?(role_list, "System Admin")
    user
    |> Map.put(:is_admin, is_admin)
    |> Map.put(:roles, role_list)
    |> Map.put(:image_url, get_profile_picture_url(user))
    # |> Map.put(:login_count, get_login_count(user.id))
  end

  def query_builder(query, %{"filters" => filters}) do
    filter_map = Converter.filter_list_to_map(filters)
    query_builder(query, filter_map)
  end
  def query_builder(query, params) do
    query
    |> id_filter(params)
    |> firstname_lastname_like_filter(params)
    |> email_like_filter(params)
    |> active_only_filter(params)
    |> member_of_role_filter(params)
  end

  def get_user_roles(user_id) do
    E2Quizzical.UserRole
    |> join(:inner, [ur], r in assoc(ur, :role))
    |> where([ur, r], ur.user_id == ^user_id)
    |> select([ur, r], r.name)
    |> Repo.all()
  end

  def get_login_count(user_id) do
    sql = """
    select count(*) c 
    from logon_attempts l inner join users u on l.username = u.username
    where l.was_successful = true 
      and u.id = $1
    """
    Ecto.Adapters.SQL.query!(E2Quizzical.Repo, sql, [user_id], timeout: 10_000) # 10s
    |> (fn %{rows: rows} ->
      rows
      |> Enum.at(0)
      |> Enum.at(0)
    end).()
  end

  def get_user_role_atoms(user_id) do
    get_user_roles(user_id)
    |> Enum.map(&String.to_atom/1)
  end

  defp id_filter(query, %{"id" => id}) do
    query
    |> where([x], x.id == ^id)
  end
  defp id_filter(query, _), do: query

  defp except_id_filter(query, %{"except_id" => id}) when not is_nil(id) do
    query
    |> where([x], x.id != ^id)
  end
  defp except_id_filter(query, _), do: query

  defp member_of_role_filter(query, %{"MemberOfRoles" => role_id_list}) when is_list(role_id_list) and length(role_id_list) > 0 do
    from x in query,
    inner_join: r in assoc(x, :user_roles),
    where: r.role_id in ^role_id_list
  end
  defp member_of_role_filter(query, _), do: query

  defp firstname_lastname_like_filter(query, %{"Name" => name}) when name != "" do
    from x in query,
    where: like(fragment("LOWER(CONCAT(?, ' ', ?))", x.first_name, x.last_name), ^("%#{String.downcase(name)}%"))
  end
  defp firstname_lastname_like_filter(query, _), do: query

  defp active_only_filter(query, %{"ActiveOnly" => active_only}) when is_boolean(active_only) and active_only == true do
    query
    |> where([x], is_nil(x.deactivated_at))
  end
  # defp active_only_filter(query, %{"ActiveOnly" => active_only}) when active_only == false do
  #   query
  #   |> where([x], not is_nil(x.deactivated_at))
  # end
  defp active_only_filter(query, _), do: query

  defp email_like_filter(query, %{"email" => email}) do
    from x in query,
    where: like(fragment("LOWER(?)", x.email), ^("%#{String.downcase(email)}%"))
  end
  defp email_like_filter(query, _), do: query
end
