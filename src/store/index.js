import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import game from './game'
import servers from './servers'
import other from './other'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    game,
    servers,
    other
  }
})
