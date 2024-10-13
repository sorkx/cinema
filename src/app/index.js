import '@/app/styles/main.scss'
import { 
    createApp 
} from 'vue'
import { 
    createPinia 
} from 'pinia'
import { 
    vOnClickOutside, 
} from '@vueuse/components'
import App from './App.vue'
import router from './providers/router'
import ProgressPlugin from './plugins/progress'

export const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(ProgressPlugin)
    .directive('click-outside', vOnClickOutside)