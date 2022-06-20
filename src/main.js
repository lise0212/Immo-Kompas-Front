import Vue from 'vue'
// import VueRouter from 'vue-router';


import App from './App.vue'
// import Home from './pages/Homepage.vue'
// import Buyer from './pages/Buyerpage.vue';

// Vue.use(VueRouter);

// const routes = [
//   {path: '/', component: Home},
//   {path: '/buyer', component: Buyer}
// ]

// const router = new VueRouter({
//   routes, 
//   mode:'history'
// })

Vue.config.productionTip = false

new Vue({
  //router,
  render: h => h(App),
}).$mount('#app')
