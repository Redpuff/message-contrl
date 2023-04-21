const searchConfig = {
  formItems: [
    {
      type: 'input',
      lable: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      lable: '权限介绍',
      prop: 'leader',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'date-picker',
      lable: '创建时间',
      prop: 'createAt'
    }
  ]
}
export default searchConfig
