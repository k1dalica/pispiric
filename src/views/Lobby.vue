<template>
  <div>
    <div>Players online: <b>{{ online }}</b></div>
    <router-link :to="{ name: 'CreateRoom' }">
      <button>Create Room</button>
    </router-link>

    <table border="1">
      <tr>
        <th>&#128274;</th>
        <th>Room</th>
        <th>Players</th>
        <th>Actions</th>
      </tr>
      <tr
        v-for="server in servers"
        :key="server.id">
        <td>{{ server.private ? '&#128274;' : '&#128275;' }}</td>
        <td>{{ server.name }}</td>
        <td>{{ server.players.length }}/{{server.type}}</td>
        <td><button @click="join(server)">Join</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      servers: 'servers/servers',
      online: 'other/online'
    })
  },

  created () {
    this.$socket.emit('get-rooms')

    this.$socket.on('update-rooms', (res) => this.$store.commit('servers/updateServers', res))
  },

  methods: {
    join (room) {
      if (!room.private) return this.$router.push({ name: 'Room', params: { id: room.id } })
      
      const pass = prompt('Enter password')
      if (pass === null) return
      if (pass === room.password) {
        return this.$router.push({ name: 'Room', params: { id: room.id }, jeb: { p: room.password } })
      } else {
        alert('Wrong room passowrd. Try again.')
        this.join()
      }
    }
  }
}
</script>