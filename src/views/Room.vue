<template>
  <div
    v-if="game"
    class="game-room">
    <game class="table" />
    
    <game-info class="game-info" />
  </div>
</template>

<script>
import store from '@/store'

import Game from '@/components/game/Game'
import GameInfo from '@/components/game/GameInfo'

export default {
  async beforeRouteEnter (to, from, next) {
    const response = await store.dispatch('servers/getRoom', to.params.id)
    if (response) next()
    else next({ name: 'Lobby' })
  },

  components: {
    Game,
    GameInfo
  },

  computed: {
    game () {
      return this.$store.state.servers.game
    },

    roomId () {
      return this.$route.params.id
    }
  },

  created () {
    this.$socket.emit('join', this.roomId)
    this.$socket.on(`update-room-${this.roomId}`, (room) => this.$store.commit('servers/setRoom', room))
  },

  beforeDestroy () {
    this.$socket.emit('leave-room', this.game?.id)
    this.$store.commit('servers/setRoom', null)
  }
}
</script>

<style lang="scss" scoped>
.game-room {
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/table.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  .table {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;
  }
  .game-info {
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
  }
}
</style>