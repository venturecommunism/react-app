DatomicLink.start

data_to_add = "[{ :description \"test\" }]"

IO.inspect {:ok, _something} = DatomicTransact.transact(data_to_add)

