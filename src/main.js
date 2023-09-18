import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'; // Import your router configuration
import store from './store'; // Import your Vuex store
import firebase from 'firebase/app';
import 'firebase/firestore'; // Importez les services Firebase dont vous avez besoin

const firebaseConfig = {
    apiKey: "AIzaSyDr5IZsJQIpcbgG8Gtch_nZFaQdkwExaPI",
    authDomain: "sandie-ceramique-a54dd.firebaseapp.com",
    databaseURL: "https://sandie-ceramique-a54dd-default-rtdb.firebaseio.com",
    projectId: "sandie-ceramique-a54dd",
    storageBucket: "sandie-ceramique-a54dd.appspot.com",
    messagingSenderId: "935101460585",
    appId: "1:935101460585:web:54a6d1d31def15a6be32f8",
    measurementId: "G-7J9BV06GFC"
};

// Initialisez Firebase avec la configuration
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
  firebase // Add the router to your Vue instance
}).$mount('#app');
