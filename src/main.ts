import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import date from './plugins/date'
import focusable from './directives/focusable'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(date)

app.directive(...focusable)
app.mount('#app')
