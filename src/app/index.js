import '@/app/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './providers/router'

export const app = createApp(App).use(createPinia()).use(router)