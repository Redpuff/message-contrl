import {
  deleteUser,
  editUserData,
  getUserTables,
  newUser,
  getPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
//定义userList类型
type user = {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
interface Isystem {
  userList: user[]
  totalCount: number
  pageList: any[]
  pageTotalCount: number
}
const userSystem = defineStore('system', {
  state: (): Isystem => {
    return {
      userList: [],
      totalCount: 0,
      // 通用页面数据
      pageList: [],
      pageTotalCount: 0
    }
  },
  actions: {
    //获取用户列表
    async postUserTablesAction(queryInfo: any) {
      const result = await getUserTables(queryInfo)

      this.userList = result.data.list || []
      this.totalCount = result.data.totalCount
    },
    //删除用户数据
    async deleteUserInfoAction(id: any) {
      const result = await deleteUser(id)
      this.postUserTablesAction({ offset: 0, size: 10 })
    },
    //创建用户数据
    async createUserAction(userInfo: any) {
      const result = await newUser(userInfo)
      //重新获取最新的用户数据
      this.postUserTablesAction({ offset: 0, size: 10 })
    },
    //编辑用户
    async editUpdateUserAction(userId: any, userInfo: any) {
      const result = editUserData(userId, userInfo)
      this.postUserTablesAction({ offset: 0, size: 10 })
    },

    //针对通用页面的增删改查
    async postPageListAction(pathName: string, queryInfo: any) {
      const result = await getPageListData(pathName, queryInfo)

      this.pageList = result.data.list || []
      this.pageTotalCount = result.data.totalCount
    },
    async deletePageByIdAction(pathName: string, id: any) {
      const result = await deletePageById(pathName, id)
      this.postPageListAction(pathName, { offset: 0, size: 10 })
    },
    async createPageAction(pathName: string, pageInfo: any) {
      const result = await newPageData(pathName, pageInfo)
      //重新获取最新的用户数据
      this.postPageListAction(pathName, { offset: 0, size: 10 })
    },
    async editUpdatePageAction(pathName: string, pageId: any, userInfo: any) {
      const result = editPageData(pathName, pageId, userInfo)
      this.postPageListAction(pathName, { offset: 0, size: 10 })
    }
  }
})

export default userSystem
