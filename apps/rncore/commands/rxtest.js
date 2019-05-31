import uuid from '../../../config/uuid'

export default {
  removeattribute({maintransact}, uuidnum, attrib, value) {
    maintransact([[
      ':db/retract',
      ["uuid", uuidnum],
      attrib,
      value
    ],
    [
      ':db/add',
      ["uuid", uuidnum],
      "confirmationid",
      uuid()
    ]])
  },
}
