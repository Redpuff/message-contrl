import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import registerIcon from './globle/register-icon'
import 'element-plus/dist/index.css'
// import 'normalize'
import '@/assets/css/index.less'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(registerIcon)

app.mount('#app')
