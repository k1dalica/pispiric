const express = require('express')
const socket = require('socket.io')
const app = express()
const cors = require('cors')
const port = 4001

app.use(cors({ origin: '*' }))

const cards = []
const suits = ['c', 's', 'd', 'h']
suits.forEach(suit => {
  for (let i = 1; i <= 13; i++)
    cards.push(suit + i)
})

let online = 0
const users = {}
const rooms = {}
const games = {}

app.get('/room/:id', function (req, res) {
  res.json(games[req.params.id] || null)
})

const httpServer = app.listen(port, () => console.log('Server is up on port', port))

const io = socket(httpServer, {
  cors: {
    origin: '*',
    methods: ["GET", "POST", 'PUT', 'DELETE']
  }
})

io.on('connection', (socket) => {
  // socket.broadcast.to(id).emit('my message', msg);
  // io.to('some room').emit('some event');

  function shuffleArray (data) {
    let array = [...data]
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  function initGame (id) {
    const seats = {}
    for (let i=1; i <= rooms[id].type; i++)
      seats[i] = null
    
    games[id] = {
      id,
      info: rooms[id],
      seats,
      started: false,
      turn: null,
      turnTimer: null,
      roundTimer: null,
      rounds: [],
      deck: null,
      used: null,
      dealer: null,
      first: null,
      t1take: null,
      t2take: null,
      t1gems: null,
      t2gems: null,
      t1sets: null,
      t2sets: null
    }
  }

  function startGame (id) {
    games[id].started = true
    games[id].turn = 0
    games[id].roundTimer = 10000
    games[id].turnTimer = 10000
    games[id].deck = shuffleArray(cards)
    games[id].first = 1
    games[id].dealer = games[id].info.type
    games[id].used = Array(4).fill().map(() => games[id].deck.pop())
    
    Array(2).fill().forEach(() => {
      Object.keys(games[id].seats).forEach(key => {
        games[id].seats[key].cards.push(games[id].deck.pop(), games[id].deck.pop(), games[id].deck.pop())
      })
    })
  }

  function updateOnline (add = 0) {
    online += add
    io.sockets.emit('update-online', online)
  }

  function updateRooms () {
    io.sockets.emit('update-rooms', rooms)
  }

  function updateRoom (id) {
    io.sockets.emit(`update-room-${id}`, games[id])
  }

  updateOnline(1)

  socket.on('set-name', (name) => {
    users[socket.id] = {
      id: socket.id,
      name
    }
    console.log(`${socket.id} has set name to ${name}`)
    return socket.id
  })

  socket.on('get-rooms', updateRooms)

  socket.on('create-room', (room) => {
    rooms[room.id] = {
      id: room.id,
      name: room.name,
      type: room.type,
      private: room.private,
      password: room.password,
      admin: socket.id,
      players: []
    }
    initGame(room.id)
    updateRooms()
    console.log(`Room ${room.name} (ID: ${room.id}) create by ${users[socket.id].name}`)
  })

  socket.on('join', (id) => {
    socket.join(id)
    if (rooms[id]) {
      rooms[id].players.push(users[socket.id])
    }
    updateRoom(id)
    updateRooms()
  })

  socket.on('leave-room', (id) => {
    const players = rooms[id] ? rooms[id].players : null

    if (!players) return
    const idx = players.findIndex(player => player === socket.id)
    rooms[id].players.splice(idx, 1)

    updateRooms()
    updateRoom(id)
  })

  socket.on('seat', ({ id, seat }) => {
    games[id].seats[seat] = {
      user: users[socket.id],
      cards: []
    }
    updateRoom(id)
  })

  socket.on('unseat', ({ id, seat }) => {
    games[id].seats[seat] = null
    updateRoom(id)
  })

  socket.on('start', id => {
    startGame(id)
    updateRoom(id)
  })

  socket.on('disconnect', () => {
    // Remove player from Room
    let roomAffected = false
    Object.values(rooms).forEach(room => {
      const idx =  room.players.findIndex(player => player.id === socket.id)
      if (idx !== -1) {
        room.players.splice(idx, 1)
        roomAffected = true
      }
    })

    delete users[socket.id]
    updateOnline(-1)

    if (roomAffected) updateRooms()
  })

  socket.on('forceDisconnect', () => {
    socket.disconnect()
  })
})
