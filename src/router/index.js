import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Login from '@/components/Login'
import RegisterUser from '@/components/RegisterUser'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'RegisterUser',
      component: RegisterUser
    },
    {
      path: '/getdata',
      name: 'User',
      component: User
    }
  ]
})
