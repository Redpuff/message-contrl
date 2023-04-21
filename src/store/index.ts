import { createPinia } from 'pinia'
import type { App } from 'vue'
import useAccountLogin from './login/loginStore'

const pinia = createPinia()
const register = (app: App) => {
  //注册pinia
  app.use(pinia)
  //获取本地数据
  const AccountLogin = useAccountLogin()
  AccountLogin.loadCacheAction()
}
export default register
