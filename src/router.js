// src/router.js

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import Basket from './views/Basket.vue';
import AdminLogin from './views/AdminLogin.vue';
import backOffice from './components/backOffice.vue';
import store from './store'; // Import your Vuex store


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket,
  },
  {
    path: '/backOffice',
    name: 'backOffice',
    component: backOffice,
    beforeEnter: (to, from, next) => {
      // Check if the user is logged in and has the 'admin' role
      if (store.state.user && store.state.user.role === 'admin') {
        // User is an admin, allow access to the route
        next();
      } else {
        // User is not an admin, redirect to another page or show an error
        next('/'); // Redirect to the home page, for example
      }
    },
  },
  {
    path: '/adminLogin', // Define the route for admin login
    name: 'AdminLogin',
    component: AdminLogin,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history', // This enables clean URLs without hash (#)
});

export default router;
