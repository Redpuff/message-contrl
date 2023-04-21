<template>
  <div class="user">
    <userSearch @query-click="queryClick" @reset-click="resetClick" />
    <tableContent
      ref="contentRef"
      @new-user-click="handleNewUser"
      @edit-click="handelEdit"
    />
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import userSearch from './search/userSearch.vue'
import tableContent from './tableContent/tableContent.vue'
import userModal from './userModal/userModal.vue'
//将searchData传入到表格组件的方法中
const contentRef = ref<InstanceType<typeof tableContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()
//重置搜索框
const resetClick = () => {
  contentRef.value?.fetchUserListData()
}
//查询用户信息
const queryClick = (searchData: any) => {
  contentRef.value?.fetchUserListData(searchData)
}
// 模态框
const handleNewUser = () => {
  modalRef.value?.dialogVisibleClick(false)
}

//编辑用户信息
const handelEdit = (userInfo: any) => {
  modalRef.value?.dialogVisibleClick(true, userInfo)
}
</script>
<style scoped lang="less">
.user {
}
</style>
