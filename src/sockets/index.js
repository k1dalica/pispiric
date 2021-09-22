import Vue from 'vue'
import openSocket from 'socket.io-client'

var sockets = {
  install: function (Vue) {
    Vue.socket = openSocket(process.env.VUE_APP_BASE_API_URL)
    Vue.prototype.$socket = Vue.socket
  }
}

Vue.use(sockets)

export default Vue.socket