const state = {
  user: null
}

const getters = {
  user: state => state.user
}

const actions = {
  setUser ({ commit }, username) {
    localStorage.setItem('username', username)
    commit('setUser', username)
  },

  logoutUser ({ commit }) {
    localStorage.removeItem('username')
    commit('setUser', null)
  }
}

const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
