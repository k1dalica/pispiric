import store from '@/store'
import sockets from '@/sockets'

const loggedIn = () => {
  const state = store.state.user
  const username = localStorage.getItem('username')
  return new Promise((resolve) => {
    if (state.user) {
      resolve(true)
    } else if (username) {
      store.dispatch('user/setUser', username).then(() => {
        sockets.emit('set-name', username)
        resolve(true)
      })
    } else {
      resolve(false)
    }
  })
}

export default loggedIn
