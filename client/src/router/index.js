import Vue from 'vue'
import VueRouter from 'vue-router'
import SportPage from "@/components/pages/sportPage.vue";
import FoodPage from "@/components/pages/foodPage.vue";
import HabitsPage from "@/components/pages/habitsPage.vue";
import LoginPage from "@/components/loginPage/loginPage.vue";
import RegistrationPage from "@/components/registrationPage/registrationPage.vue";
import ProfilePage from "@/components/pages/profilePage.vue";

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
    path: '/food',
    name: 'FoodPage',
    component: FoodPage
  },
  {
    path: '/habits',
    name: 'HabitsPage',
    component: HabitsPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
