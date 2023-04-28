interface Modal {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

const modalConfig: Modal = {
  pageName: 'role',
  header: {
    newTitle: '新建',
    editTitle: '编辑'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '权限介绍'
    }
  ]
}
export default modalConfig
