defmodule WebAgent.IntegrationCase do

  use ExUnit.CaseTemplate

  using do
    quote do
      use Wallaby.DSL
    end
  end

  setup do
    {:ok, session} = Wallaby.start_session
    {:ok, session: session}
  end
end

