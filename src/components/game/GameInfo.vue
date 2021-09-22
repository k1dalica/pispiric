<template>
  <div>
    <score />

    <room-chat />
  </div>
</template>

<script>
import Score from './Score'
import RoomChat from '../chat/RoomChat'
// import PlayersInfo from './PlayersInfo'

export default {
  components: {
    Score,
    RoomChat
  }  
}
</script>

<style lang="scss" scoped>

</style>
