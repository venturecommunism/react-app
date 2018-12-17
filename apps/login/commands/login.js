import { loadsyncpoint } from '../../../config/context/persistence'

export default {
  login_page({localtransact, maintransact}, username, password) {
// try to do without item 3 being on its own
      localtransact([{
        ':db/id': -1,
        email: username,
        id: 'email',
      },
      {
        ':db/id': -2,
        password: password,
        id: 'password',
      },
      {
        ':db/id': -3,
        owner: username,
        id: 'owner',
      },

])
//      loadsyncpoint(maintransact, username)
  },
}
