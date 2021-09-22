<template>
  <div class="game-table">
    <div
      v-if="true || game.started"
       class="my-hand">
      <cards
        :cards="myCards"
        hoverable />
    </div>

    <div
       class="oponent-1">
      <cards
        :cards="oponentCards"
        :angle="180"
        small />
    </div>

    <div
       class="oponent-2">
      <cards
        :cards="oponentCards"
        :angle="90"
        small />
    </div>

    <div
       class="oponent-3">
      <cards
        :cards="oponentCards"
        :angle="270"
        small />
    </div>

    <div class="talon">
      <card
        v-for="(card, index) in myCards"
        :key="card + index + 'talon'"
        :card="card"
        :style="{
          top: getRandomInt(20) + 'px',
          left: getRandomInt(20) + 'px',
          transform: getRandomRotation()
        }"
        class="card" />
    </div>

    <button
      v-if="showPlayButton"
      :disabled="false && disablePlayButton"
      @click="start()">
      Start Game
    </button>
  </div>
</template>

<script>
import Card from './Card'
import Cards from './Cards'

export default {
  components: {
    Card,
    Cards
  },

  computed: {
    oponentCards () {
      return Array(6).fill(null)
    },

    myCards () {
      return ['h4', 'h13', 'c8', 'd4', 'd2']
      // return this.mySeat.cards
    },

    mySeat () {
      return Object.values(this.seats).find(seat => seat?.user?.id === this.$socket.id)
    },

    seats () {
      return this.game.seats
    },

    players () {
      return (this.game?.info?.players || []).filter(player => player)
    },

    showPlayButton () {
      return this.$socket.id === this.game.info.admin
    },

    disablePlayButton () {
      return this.game.info.type > Object.values(this.game.seats).filter(seat => seat)
    },

    game () {
      return this.$store.state.servers.game
    },

    roomId () {
      return this.$route.params.id
    }
  },

  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * max)
    },

    getRandomRotation () {
      const angle =  this.getRandomInt(50) - 25;
      return 'rotate('+ angle +'deg)'
    },

    start () {
      this.$socket.emit('start', this.roomId)
    },

    takeSeat (seat) {
      this.$socket.emit('seat', {
        id: this.roomId,
        seat
      })
    },

    unseat (seat) {
      this.$socket.emit('unseat', {
        id: this.roomId,
        seat
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.game-table {
  position: relative;
  .talon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 140px;
    height: 210px;
    margin: auto;
    .card {
      position: absolute;
    }
  }

  .oponent-1 {
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .oponent-2 {
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 130px;
    display: flex;
    align-items: center;
  }

  .oponent-3 {
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 130px;
    display: flex;
    align-items: center;
  }

  .my-hand {
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>