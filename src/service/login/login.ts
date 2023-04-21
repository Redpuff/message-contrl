import type { AccountType } from '@/views/login/types'
import LocStorage from '@/utils/cache'
import hyRequest from '..'
import { LOGIN_TOKEN } from '@/globle/constant'
const token = LocStorage.getLocStorage(LOGIN_TOKEN)
//验证登录
export const accountLogin = (account: AccountType) => {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
//验证token有效性
export const verificationToken = () => {
  return hyRequest.get({
    url: '/test',
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
}
//获取用户信息
export const getUserInfoById = (id: number) => {
  return hyRequest.get({
    url: `/users/${id}`
  })
}
//获取用户菜单树
export const getUserMenusByRoleId = (id: number) => {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
