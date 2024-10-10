import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ 
    easing: 'ease', 
    speed: 500, 
    showSpinner: false 
})

export default {
    install: (app) => {
        app.config.globalProperties.$progress = NProgress;
    }
}