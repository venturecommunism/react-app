defmodule TestWebsite do
  use WebAgent.IntegrationCase

  import Wallaby.Query, only: [link: 1]

  test "navigate to test website", %{session: session} do
    session
     |> visit("https://test.com")
     |> take_screenshot
  end
end

