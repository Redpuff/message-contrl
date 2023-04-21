<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户表单</h3>
      <el-button class="btn" type="primary" @click="handleNewUserClick"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
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
          label="用户名"
          width="120px"
        />
        <el-table-column
          align="center "
          prop="realname"
          label="真实姓名"
          width="120px"
        />
        <el-table-column
          align="center "
          prop="cellphone"
          label="手机号码"
          width="120px"
        />
        <el-table-column
          align="center "
          prop="enable"
          label="状态"
          width="80px"
        >
          <template #default="{ row: { enable } }"
            ><el-tag v-if="enable" class="ml-2" type="success">启用</el-tag>
            <el-tag v-else class="ml-2" type="success">启用</el-tag>
          </template>
        </el-table-column>
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
        :total="totalCount"
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
const fetchUserListData = (searchData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryData = { size, offset, ...searchData }

  userSystemStory.postUserTablesAction(queryData)
}
//删除用户
const handleDeleteClick = (id: any) => {
  userSystemStory.deleteUserInfoAction(id)
}
//编辑用户
const editUserClick = (userInfo: any) => {
  emit('editClick', userInfo)
}
fetchUserListData()
//使数据变为响应式
const { userList, totalCount } = storeToRefs(userSystemStory)

const handleSizeChange = () => {
  fetchUserListData()
}
const handleCurrentChange = () => {
  fetchUserListData()
}

//创建用户
const handleNewUserClick = () => {
  emit('newUserClick')
}

//将属性方法暴露出去
defineExpose({ fetchUserListData })
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
