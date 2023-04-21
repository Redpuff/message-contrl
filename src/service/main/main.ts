import hyRequest from '..'

export const getEntireRoles = () => {
  return hyRequest.post({
    url: '/role/list'
  })
}
export const getEntireDepartments = () => {
  return hyRequest.post({
    url: '/department/list'
  })
}
