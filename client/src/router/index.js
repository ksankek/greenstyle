import Vue from 'vue'
import VueRouter from 'vue-router'
import SportPage from "@/components/pages/sportPage.vue";
import LoginPage from "@/components/loginPage/loginPage.vue";
import RegistrationPage from "@/components/registrationPage/registrationPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/registration',
    name: 'RegistrationPage',
    component: RegistrationPage
  },
  {
    path: '/sport',
    name: 'SportPage',
    component: SportPage
  },
  {
    path: '/*',
    redirect: '/sport'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
