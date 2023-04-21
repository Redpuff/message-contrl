import hyRequest from '@/service'
//获取用户列表
export const getUserTables = (queryInfo: any) => {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
//删除用户
export const deleteUser = (id: any) => {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
//新建用户
export const newUser = (userInfo: any) => {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}
//编辑用户
export const editUserData = (userId: any, userInfo: any) => {
  return hyRequest.patch({
    url: `/users/${userId}`,
    data: userInfo
  })
}
//通用页面增删改查
export const getPageListData = (pathName: string, queryInfo: any) => {
  return hyRequest.post({
    url: `/${pathName}/list`,
    data: queryInfo
  })
}
export const deletePageById = (pathName: string, id: any) => {
  return hyRequest.delete({
    url: `/${pathName}/${id}`
  })
}
export const newPageData = (pathName: string, queryInfo: any) => {
  return hyRequest.post({
    url: `/${pathName}`,
    data: queryInfo
  })
}
export const editPageData = (pathName: string, pageId: any, userInfo: any) => {
  return hyRequest.patch({
    url: `/${pathName}/${pageId}`,
    data: userInfo
  })
}
