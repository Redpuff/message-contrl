<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <el-button class="btn" type="primary" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle
      }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propList" :key="item.type">
          <template v-if="item.type === 'timer'">
            <el-table-column
              align="center "
              :prop="item.prop"
              :label="item.lable"
            >
              <template #default="scope">
                {{ formatDate(scope.row[item.prop || '']) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handel'">
            <el-table-column align="center " :label="item.lable" width="140px">
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
          </template>
          <template v-else>
            <el-table-column
              :type="item.type"
              :label="item.lable"
              align="conter"
              :width="item.width"
              :prop="item.prop"
            />
          </template>
        </template>
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
interface Iprops {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propList: Array<{
      type: string
      lable: string
      prop?: string
      width?: string
    }>
  }
}

const prop = defineProps<Iprops>()
//创建自定义事件
const emit = defineEmits(['newPageClick', 'editClick'])
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

  userSystemStory.postPageListAction(prop.contentConfig.pageName, queryData)
}
//删除用户
const handleDeleteClick = (id: any) => {
  userSystemStory.deletePageByIdAction(prop.contentConfig.pageName, id)
}
//编辑用户
const editUserClick = (userInfo: any) => {
  emit('editClick', userInfo)
}
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
  emit('newPageClick')
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
