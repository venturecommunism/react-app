defmodule Browser do
  alias Porcelain.Process, as: Proc

  def start(cmd) do
    Porcelain.spawn_shell(cmd, in: :receive, out: {:send, self()})
  end

  def loop(proc) do
    %{pid: pid} = proc
    receive do
      {^pid, :data, :out, data} -> data
      dostuff(data, proc)
    end
    loop(proc)
  end

  def dostuff("Enter your input (will keep asking until we get a number):  ", proc) do
    IO.inspect "Enter your input (will keep asking until we get a number): "
    IO.inspect "ENTERING A COMMAND THEN SLEEPING FOR 1000000 MILLISECONDS (i.e. too long)"
    IO.puts "newline"
    Proc.send_input(proc, "goto\n")
    Process.sleep(1000000)
  end

  def dostuff(data, _) do
    IO.inspect data
    IO.puts "newline"
    Process.sleep(10)
  end
end

#Application.ensure_all_started(:porcelain)
#proc = Browser.start("cd ~/react-app/apps/browser/priv/es6-prompt && npm start")
#Browser.loop(proc)
