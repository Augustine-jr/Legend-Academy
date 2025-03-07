import './assets/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice' // PrimeVue toast service
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
pinia.use(piniaPersist)
app.use(router)

app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
