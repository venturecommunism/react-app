defmodule Watcher do
  def watch do
    IO.puts "Watching..."
    {:ok, _pid} = FileSystem.start_link(dirs: ["../web_agent/screenshots"], name: :my_monitor_name)
    FileSystem.subscribe(:my_monitor_name)
    receive do
      x -> IO.inspect x
    end
    IO.puts "Found one!"
  end
end

Watcher.watch
