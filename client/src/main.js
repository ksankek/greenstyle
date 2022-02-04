import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//styles
import './css/_main.scss'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//components
import animation from "@/custom_components/animation/animation.vue";

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('animation', animation);

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
