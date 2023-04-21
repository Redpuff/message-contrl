import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface DepartmentsList {
  id: number
  name: string
  parentId?: number
  createAt: string
  updateAt: string
  leader: string
}

interface IMainState {
  entireRoles: any[]
  entireDepartments: DepartmentsList[]
}

const userMainStore = defineStore('main', {
  state: (): IMainState => {
    return {
      entireRoles: [],
      entireDepartments: []
    }
  },
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const Departments = await getEntireDepartments()

      this.entireRoles = rolesResult.data.list
      this.entireDepartments = Departments.data.list
    }
  }
})
export default userMainStore
