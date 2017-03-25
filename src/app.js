import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

if (typeof module !== 'undefined') {
  module.exports = app;
}

export { app, router, store }
