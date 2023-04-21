const searchConfig = {
  formItems: [
    {
      type: 'input',
      lable: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      lable: '部门领导',
      prop: 'leader',
      placeholder: '请输入部门领导姓名'
    },
    {
      type: 'date-picker',
      lable: '创建时间',
      prop: 'createAt'
    }
  ]
}
export default searchConfig
