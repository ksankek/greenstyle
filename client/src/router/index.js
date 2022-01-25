import Vue from 'vue'
import VueRouter from 'vue-router'
import MainComponent from "@/components/mainComponent.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainComponent
  }
]

const router = new VueRouter({
  routes
})

export default router
