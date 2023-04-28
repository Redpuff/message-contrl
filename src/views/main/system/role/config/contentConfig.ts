const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propList: [
    {
      type: 'selection',
      lable: '选择',
      width: '80xp'
    },
    {
      type: 'index',
      lable: '序号',
      width: '60xp'
    },
    {
      type: 'normal',
      lable: '角色名称',
      prop: 'name',
      width: '150xp'
    },
    {
      type: 'normal',
      lable: '权限介绍',
      prop: 'intro',
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
