import Datomic.Channel

topic = "someproc"

DatomicGenServer.start_link(
  Application.get_env(:datomic, :database),
  true,
  [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:registry, via_tuple(topic)}]
)

data_to_transact = """
[{
  :type "group"
  :members ["someone@someplace.com"]
  :id "someone@someplace.com"
}]
"""

DatomicTransact.transact(data_to_transact)

