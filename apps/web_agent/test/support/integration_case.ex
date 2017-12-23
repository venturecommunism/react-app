defmodule WebAgent.IntegrationCase do
  use ExUnit.CaseTemplate
  use Wallaby.DSL

  using do
    quote do
      use Wallaby.DSL

      import WebAgent.TestHelpers
    end
  end

  setup do
    {:ok, session} = Wallaby.start_session
    resized_session = resize_window(session, 1920, 1080)
    {:ok, session: resized_session}
  end
end

