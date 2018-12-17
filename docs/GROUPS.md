data_to_transact = """
[{
  :type "group"
  :members ["user@somewhere.com"]
  :id "user@somewhere.com"
},
{
  :type "group"
  :members ["user@somewhere.com" "test@somewhere.com"]
  :id "somegroup"
},
{
  :type "group"
  :members ["test@somewhere.com"]
  :id "test@somewhere.com"
}]
"""

DatomicTransact.transact(data_to_transact)
