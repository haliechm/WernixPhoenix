defmodule E2QuizzicalWeb.Router do
  use E2QuizzicalWeb, :router

  pipeline :browser do
    plug :accepts, ["html", "json"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug(CORSPlug,
      origin: [
        "http://localhost:3000",
        "http://localhost:4000"
        # "http://52.7.106.78/",
        # "https://docks.tcwlogistics.com/",
        # "https://qa.tcwlogistics.com/"
      ]
    )
    plug :accepts, ["json", "html"]
  end

  pipeline :auth do
    plug E2Quizzical.AuthPipeline
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  pipeline :ensure_admin do
    plug E2Quizzical.EnsureAdmin
  end

  # TO DO --> ADD auth type for super admins only
  pipeline :monitor do
    plug :accepts, ["json", "html"]
  end

  # no authentication required
  scope "/api", E2QuizzicalWeb do
    pipe_through [:api]

    post("/set_password", PublicController, :set_password)
    post("/forgot_password", PublicController, :forgot_password)
    post("/log_in", PublicController, :log_in)
  end

  # authentication optional
  scope "/api", E2QuizzicalWeb do
    pipe_through [:api, :auth]

    get("/auth_check/:x", PublicController, :auth_check)
    post("/save_profile", AdminController, :save_profile)
    post("/update_password", AdminController, :update_password)
    get("/reference/:table_name", ReferenceController, :get_ref_data_list)
    post("/log_out", PublicController, :log_out)
  end

  scope "/api/admin", E2QuizzicalWeb do
    pipe_through [:api, :auth, :ensure_auth, :ensure_admin]

    # post("/buildings", AdminController, :list_buildings)
    # post("/building/toggle_active/:id", AdminController, :toggle_building_active)
    # post("/building", AdminController, :save_building)

    post("/user", AdminController, :save_user)
    post("/users", AdminController, :list_users)
    get("/user/:user_id", AdminController, :get_user)
    post("/toggle_user_active/:id", AdminController, :toggle_user_active)
    post("/toggle_user_must_change_password/:id", AdminController, :toggle_user_must_change_password)
    post("/unlock_user/:id", AdminController, :unlock_user)
    post("/impersonate/:id", AdminController, :impersonate)
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/monitor" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: E2QuizzicalWeb.Telemetry
    end
  end

   # authentication optional
  scope "/", E2QuizzicalWeb do
    # pipe_through([:browser, :api_maybe_auth])
    pipe_through([:browser])

    get("/", PublicController, :index)
    get("/reset_password/token/:token", PublicController, :reset_password_request)

    # this routes back to React Router for all page navigations
    get("/*path", PublicController, :index)
    # this will keep hackers from attempting other urls
    post("/*path", PublicController, :nothing)
    delete("/*path", PublicController, :nothing)
    patch("/*path", PublicController, :nothing)
  end
end
