import {
  accountLogin,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { AccountType } from '@/views/login/types'
import { defineStore } from 'pinia'
import LocStorage from '@/utils/cache'
import { LOGIN_TOKEN } from '@/globle/constant'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/mapMenu'
import useMainStore from '@/store/main/main'
interface LoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useAccountLogin = defineStore('login', {
  state: (): LoginState => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  actions: {
    async accountLoginAction(account: AccountType) {
      //账号登陆
      const result = await accountLogin(account)
      const id = result.data.id
      //获取token
      this.token = result.data.token
      LocStorage.setLocStorage(LOGIN_TOKEN, this.token)

      const name = result.data.name
      //获取用户信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      //获取用户菜单树
      const userMenu = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenu.data
      //缓存数据
      LocStorage.setLocStorage('userMenus', userMenu.data)
      LocStorage.setLocStorage('userInfo', userInfoResult.data)

      //获取所有的角色信息和部门列表
      const entireData = useMainStore()
      entireData.fetchEntireDataAction()
      //路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },
    //获取token 用户信息和菜单，存入pinia中，如果三者都有就重新添加动态路由
    loadCacheAction() {
      const token = LocStorage.getLocStorage(LOGIN_TOKEN)
      const userInfo = LocStorage.getLocStorage('userInfo')
      const userMenus = LocStorage.getLocStorage('userMenus')
      if (token && userInfo && userMenus) {
        //获取所有的角色信息和部门列表
        const entireData = useMainStore()
        entireData.fetchEntireDataAction()

        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default useAccountLogin
