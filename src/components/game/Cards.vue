<template>
  <div
    class="cards"
    :style="{ transform: `rotate(${angle}deg)` }">
    <card
      v-for="(card, index) in cards"
      :key="card"
      :card="card"
      :hoverable="hoverable"
      :small="small"
      class="card"
      :style="getCardStyle(index)" />
  </div>
</template>

<script>
import Card from './Card'

export default {
  components: {
    Card
  },

  props: {
    cards: {
      type: Array,
      required: true
    },

    angle: {
      type: Number,
      default: 0
    },

    hoverable: {
      type: Boolean,
      default: false
    },

    small: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    getCardStyle (index) {
      const angleDiff = this.small ? 8 : 10
      const distance = this.small ? 40 : 50
      const topDifference = this.small ? 15 : 20

      const half = this.cards.length % 2 === 0 ? this.cards.length / 2 : (this.cards.length - 1) / 2
      let angleStart = 0
      if (this.cards.length > 1) angleStart = this.cards.length % 2 === 0 ? 5 - (angleDiff * half) : 0 - (angleDiff * half)

      let multiplyer =  index >= half ? this.cards.length - index - 1 : index
      let bottom = (topDifference - (2 * multiplyer)) * multiplyer
      return {
        left: ((index * distance) - distance) + 'px',
        bottom: `${bottom}px`,
        transform: `rotate(${angleStart + (angleDiff * index)}deg)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  .card {
    position: relative;
    display: inline-block;
    width: 171px;
    margin-left: -171px;
    vertical-align: top;
  }
}
</style>