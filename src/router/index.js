import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Login from '@/components/Login'
import RegisterUser from '@/components/RegisterUser'
import VerifyEmail from '@/components/VerifyEmail'

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
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/verify',
      component: VerifyEmail
    },
    {
      path: '/verify/:id',
      component: VerifyEmail

    }
  ]
})
