<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button class="btn" type="primary" @click="handleNewUserClick"
        >新建部门</el-button
      >
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column align="center " type="selection" />
        <el-table-column
          align="center "
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center "
          prop="name"
          label="部门名称"
          width="120px"
        />
        <el-table-column
          align="center "
          prop="leader"
          label="部门领导"
          width="120px"
        />
        <el-table-column
          align="center "
          prop="parentId"
          label="上级部门"
          width="120px"
        />

        <el-table-column align="center " prop="createAt" label="创建时间">
          <template #default="{ row: { createAt } }">
            {{ formatDate(createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center " prop="updateAt" label="更新时间">
          <template #default="{ row: { updateAt } }">
            {{ formatDate(updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center " label="操作" width="140px">
          <template #default="scope">
            <el-button
              size="small"
              link
              type="primary"
              :icon="EditPen"
              @click="editUserClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              link
              type="danger"
              :icon="Delete"
              @click="handleDeleteClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10]"
        :small="true"
        layout="->,total, sizes, prev, pager, next, jumper "
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import userSystem from '@/store/main/system/system'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { ref } from 'vue'
//创建自定义事件
const emit = defineEmits(['newUserClick', 'editClick'])
//分页
const currentPage = ref(1)
const pageSize = ref(10)
// 获取仓库
const userSystemStory = userSystem()
// 根据页码和页数获取网络请求
const fetchPageListData = (searchData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryData = { size, offset, ...searchData }

  userSystemStory.postPageListAction('department', queryData)
}
//删除用户
const handleDeleteClick = (id: any) => {
  userSystemStory.deletePageByIdAction('department', id)
}
//编辑用户
const editUserClick = (userInfo: any) => {
  emit('editClick', userInfo)
}
//页面加载完成时请求一次数据
fetchPageListData()
//使数据变为响应式
const { pageList, pageTotalCount } = storeToRefs(userSystemStory)

const handleSizeChange = () => {
  fetchPageListData()
}
const handleCurrentChange = () => {
  fetchPageListData()
}

//创建用户
const handleNewUserClick = () => {
  emit('newUserClick')
}

//将属性方法暴露出去
defineExpose({ fetchPageListData })
</script>
<style scoped lang="less">
.content {
  margin-top: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .title {
    font-size: 20px;
    font-weight: 800;
  }
}
.el-pagination {
  padding: 10px;
}
</style>
