<template>
  <div class="home">
    <div>Choose a nickname</div>
    <input
      v-model="username"
      type="text">
    <button @click="login()">Submit</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: ''
    }
  },

  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),

    login () {
      this.$socket.emit('set-name', this.username)
      this.setUser(this.username).then(() => {
        this.$router.push({ name: 'Lobby' })
      })
    }
  }
}
</script>