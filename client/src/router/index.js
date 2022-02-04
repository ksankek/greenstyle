import Vue from 'vue'
import VueRouter from 'vue-router'
import MainComponent from "@/components/mainComponent/mainComponent.vue";
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
    name: 'MainComponent',
    component: MainComponent
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
