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
  ]

export default followerdatoms
