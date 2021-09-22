import axios from 'axios'

const state = {
  servers: {},
  game: null
}

const getters = {
  servers: state => state.servers,
  find: state => state.game
}

const actions = {
  async getRoom ({ commit }, id) {
    const { data } = await axios.get(`/room/${id}`)
    if (data) {
      commit('setRoom', data)
    }
    return data
  }
}

const mutations = {
  updateServers (state, data) {
    state.servers = data
  },

  setRoom (state, data) {
   state.game = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
