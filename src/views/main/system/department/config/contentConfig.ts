const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门表单',
    btnTitle: '新建部门'
  },
  propList: [
    {
      type: 'selection',
      lable: '选择',
      width: '60xp'
    },
    {
      type: 'index',
      lable: '序号',
      width: '60xp'
    },
    {
      type: 'normal',
      lable: '部门名称',
      prop: 'name',
      width: '150xp'
    },
    {
      type: 'normal',
      lable: '部门领导',
      prop: 'leader',
      width: '150xp'
    },
    {
      type: 'normal',
      lable: '上级部门',
      prop: 'parentId',
      width: '150xp'
    },
    {
      type: 'timer',
      lable: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'timer',
      lable: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'handel',
      lable: '操作'
    }
  ]
}
export default contentConfig
