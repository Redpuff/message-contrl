import router from '@/router'
// 通过import.meta.glob 加载router文件夹下的所有路由信息
import type { RouteRecordRaw } from 'vue-router'
function loadLoaclRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  //将对象放入到localRoutes中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null

//根据获取到的动态路由 与将用户应有菜单进行比较过滤出当前用户可以显示的菜单
export function mapMenusToRoutes(userMenus: any[]) {
  const loaclRoutes = loadLoaclRoutes()
  const routes: RouteRecordRaw[] = []

  //动态添加一级路由
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = loaclRoutes.find((item) => {
        return item.path === subMenu.url
      })
      if (route) {
        if (!routes.find((item) => item.path === menu.path)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        routes.push(route)
      }
      //记录第一个被匹配到的路由
      if (firstMenu === null && route) firstMenu = subMenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配想要的菜单
 * @param path 需要匹配的路径
 * @param menus 所有路由信息
 */

export function mapPathToMenu(path: string, menus: any[]) {
  for (const menu of menus) {
    for (const item of menu.children) {
      if (item.url === path) return item.id
    }
  }
}

interface Ibreadcrumb {
  name: string
  path: string
}

//遍历出用户有权限的菜单，返回出去
export function mapPathToBreadcrumb(path: string, menus: any[]) {
  const breadcrumb: Ibreadcrumb[] = []
  for (const menu of menus) {
    for (const item of menu.children) {
      if (item.url === path) {
        breadcrumb.push({ name: menu.name, path: menu.url })
        breadcrumb.push({ name: item.name, path: item.url })
      }
    }
  }
  return breadcrumb
}
