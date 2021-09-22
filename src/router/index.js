import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import loggedIn from '@/services/auth'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    loggedIn().then(response => {
      response ? next() : next({ name: 'Home' })
    })
  } else {
    next()
  }
})

export default router
