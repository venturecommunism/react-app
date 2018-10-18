import uuid from '../../../../config/uuid'
const date = Math.floor(new Date().toString() / 1000)

  /**
   * Define some seed data
   * 
   */
  const followerdatoms = [
    {
      ':db/id': -1,
      uuid: uuid(),
      description: "Calendar entry (FAKE)",
      due: "when",
      entry: "yow",
      status: "pending"
    },
    {
      ':db/id': -2,
      description: "inbox item (FAKE)",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -3,
      description: "inbox item #2 (FAKE)",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -4,
      uuid: uuid(),
      status: "pending",
      type: "project",
      entry: date,
      description: "Some project (FAKE)"
    },
    {
      ':db/id': -5,
      description: "SomedayMaybe item #2 (FAKE)",
      entry: date,
      status: "pending",
      wait: "somedaymaybe",
      uuid: uuid()
    },
    {
      ':db/id': -6,
      uuid: uuid(),
      status: "pending",
      type: "project",
      entry: date,
      description: "Some other project (FAKE)"
    },
    {
      ':db/id': -7,
      description: "some todo item",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -8,
      description: "another something time time really important",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -9,
      uuid: uuid(),
      status: "pending",
      entry: date,
      description: "Some other project (FAKE)"
    },
    {
      ':db/id': -10,
      description: "some todo item",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -11,
      description: "another something time time really important",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -12,
      uuid: uuid(),
      status: "pending",
      entry: date,
      description: "Some other project (FAKE)"
    },
    {
      ':db/id': -13,
      description: "some todo item",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
    {
      ':db/id': -14,
      description: "another something time time really important",
      entry: date,
      status: "pending",
      uuid: uuid()
    },
  ]

export default followerdatoms
