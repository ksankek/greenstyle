import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue2Editor from "vue2-editor";

//styles
import './css/_main.scss'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue2-editor/dist/vue2-editor.css";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

//components
import animation from "@/custom_components/animation/animation.vue";

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vue2Editor);

Vue.component('animation', animation);

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
