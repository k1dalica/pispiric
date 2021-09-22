const state = {
  online: {}
}

const getters = {
  online: state => state.online
}

const actions = {}

const mutations = {
  setOnline (state, data) {
    state.online = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
