interface Modal {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

const modalConfig: Modal = {
  pageName: 'department',
  header: {
    newTitle: '新建',
    editTitle: '编辑'
  },
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导姓名'
    },
    {
      type: 'selection',
      label: '选择部门',
      prop: 'parentId',
      options: []
    }
  ]
}
export default modalConfig
