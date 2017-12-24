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
    user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
    accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    connection = "keep-alive"

    custom_headers = [{:accept, accept},
                      {:connection, connection},
                      {:user_agent, user_agent}]

    {:ok, session} = Wallaby.start_session([{:custom_headers, custom_headers}, {:user_agent, user_agent}])
    resized_session = resize_window(session, 1920, 1080)
    {:ok, session: resized_session}
  end
end

