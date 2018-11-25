import { loadsyncpoint } from '../../../config/context/persistence'

export default {
  login_page({localtransact, maintransact}, username, password) {
      localtransact([{
        ':db/id': -1,
        email: username,
        id: 'email',
      },
      {
        ':db/id': -2,
        password: password,
        id: 'password',
      }])
      loadsyncpoint(maintransact, username)
  },
}
