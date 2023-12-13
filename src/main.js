import './assets/main.css'
import { initializeApp } from "firebase/app";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

initializeApp({
    apiKey: "AIzaSyA-TKaB4EJARBbxqor_wtptRYsKuNHJxCM",
    authDomain: "twitter-clone-ad1ad.firebaseapp.com",
    projectId: "twitter-clone-ad1ad",
    storageBucket: "twitter-clone-ad1ad.appspot.com",
    messagingSenderId: "266827086914",
    appId: "1:266827086914:web:e6489989dd0ba0ce46c1db",
    measurementId: "G-GZFZQ8N9JW"
})

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
