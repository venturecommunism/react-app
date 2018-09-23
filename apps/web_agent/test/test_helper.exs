ExUnit.start()
{:ok, _} = Application.ensure_all_started(:wallaby)
Application.put_env(:wallaby, :screenshot_on_failure, true)

defmodule WebAgent.TestHelpers do

  use Wallaby.DSL

  import Wallaby.Query, only: [css: 1]

  def get_text(session, selector) do
    session |> find(css(selector)) |> Element.text
  end
end
