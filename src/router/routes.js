import View from '../views/View'
import Home from '../views/Home'
import Lobby from '../views/Lobby'
import Room from '../views/Room'
import CreateRoom from '../views/CreateRoom'

export default [
  {
    path: '/',
    name: 'View',
    component: View,
    redirect: { name: 'Lobby' },
    meta: { auth: true },
    children: [
      {
        path: 'lobby',
        name: 'Lobby',
        component: Lobby
      },
      {
        path: 'room/create',
        name: 'CreateRoom',
        component: CreateRoom
      },
      {
        path: 'room/:id',
        name: 'Room',
        component: Room
      },
    ]
  },
  {
    path: '/main',
    name: 'Home',
    component: Home
  }
]
