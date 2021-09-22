<template>
  <div>
    <div>
      <h1>Create Room</h1>
      <label>Name</label>
      <input
        v-model="name"
        type="text">
      <label>Game Type</label>
      <div>
        <button
          :class="{ outline: type === 2 }"
          @click="type = 2">2 Players</button>
        <button
          :class="{ outline: type === 4 }"
          @click="type = 4">4 Players</button>
      </div>
      <div>
        <button
          :class="{ outline: isPrivate }"
          @click="isPrivate = false">Public</button>
        <button
          :class="{ outline: !isPrivate }"
          @click="isPrivate = true">Private</button>
      </div>

      <transition name="slide-fade">
        <div v-show="isPrivate">
          <label>Room password</label>
          <input
            type="password"
            v-model="password">
        </div>
      </transition>

      <button @click="create()">Create</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      type: 2,
      password: null,
      isPrivate: false
    }
  },

  methods: {
    create () {
      let id = Math.round(Math.random() * 10000)
      this.$socket.emit('create-room', {
        id,
        name: this.name,
        private: this.isPrivate,
        type: this.type,
        password: this.isPrivate ? this.password : null
      })
      this.$router.push({ name: 'Room', params: { id } })
    }
  }
}
</script>