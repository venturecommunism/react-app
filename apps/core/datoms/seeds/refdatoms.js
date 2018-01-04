  /**
   * Define some seed data; including some `follower` references (that make
   * use of a temporary id to point to other entities within the array.)
   */
  const refdatoms = [
    {
      ':db/id': -1,
      name: 'John',
      follows: -3
    },
    {
      ':db/id': -2,
      name: 'David',
      follows: [-3, -1]
    },
    {
      ':db/id': -3,
      name: 'Jane'
    },
  ]

export default refdatoms
