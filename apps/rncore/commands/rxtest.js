export default {
  removeattribute({maintransact}, uuid, attrib, value) {
    maintransact([[
      ':db/retract',
      ["uuid", uuid],
      attrib,
      value
    ]])
  },
}
