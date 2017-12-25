defmodule Watcher.Worker do
  use GenServer

  def start_link(watcher_name, paths) do
    GenServer.start_link(__MODULE__, watcher_name, paths)
  end
end

    args = [{:watcher_name, "test"}, {:paths, [["/tmp/someplace"]]}]

Watcher.start("anytype", args)

#Sentix.subscribe(:watcher_name)

