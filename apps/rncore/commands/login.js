export default {
  login_page({conn, transact, putAsync, chUnPass}, username, password) {
    putAsync(chUnPass, {email: username, password: password})
  },
}
