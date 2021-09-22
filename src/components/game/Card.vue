<template>
  <div
    class="card"
    :class="{ hoverable, small }">
    <img :src="image" />
  </div>
</template>

<script>
import cardsImages from '@/components/game/card-images.js'

export default {
  props: {
    card: {
      type: [String, Object],
      default: null
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

  data () {
    return {
      cardsImages
    }
  },

  computed: {
    image () {
      return !this.card ? this.cardsImages.back : this.cardsImages[this.card]
    }
  }  
}
</script>

<style lang="scss" scoped>
  .card {
    &.hoverable:hover img {
      transform: scale(1.1);
      transition: all ease .2s;
      cursor: pointer;
    }
    &.small img {
      width: 100px;
    }
  }
</style>