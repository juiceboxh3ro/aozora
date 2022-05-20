defmodule AozoraWeb.Router do
  use AozoraWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", AozoraWeb do
    pipe_through :api

    resources "/kanji", KanjiController, except: [:new, :edit]
    resources "/kanji/examples", ExampleController, except: [:new, :edit]

    get "/list_kanji/:character", KanjiController, :show_character
    post "/list_kanji", KanjiController, :show_many_characters

    resources "/radicals", RadicalController, except: [:new, :edit]

    get "/list_radical/:bushu", RadicalController, :show_by_bushu
    post "/list_radicals", RadicalController, :list_by_bushu

    resources "/discord_members", DiscordMemberController, except: [:new, :edit]
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

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: AozoraWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
