import Datomic.Channel

topic = "someproc"

DatomicGenServer.start_link(
  Application.get_env(:datomic, :database),
  true,
  [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:registry, via_tuple(topic)}]
)

data_to_transact = """
[[:db/add [:uuid "adsklakbl"] :project "someproject"]]
"""

DatomicTransact.transact(data_to_transact)
