<template>
  <div class="department">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handelQueryListClick"
      @reset-click="handelResetClick"
    />
    <pageContent
      ref="contentRef"
      @new-user-click="handleNewUserClick"
      @edit-click="handelEditClick"
    />
    <pageModal ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
import pageSearch from '@/components/page-search/pageSearch.vue'
import pageContent from './pageContent/pageContent.vue'
import pageModal from './pageModal/pageModal.vue'
import searchConfig from '@/views/main/system/department/config/searchConfig'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof pageContent>>()
const modalRef = ref<InstanceType<typeof pageModal>>()
const handelQueryListClick = (searchForm: any) => {
  contentRef.value?.fetchPageListData(searchForm)
}
const handelResetClick = () => {
  contentRef.value?.fetchPageListData()
}
const handleNewUserClick = () => {
  modalRef.value?.dialogVisibleClick(false)
}
const handelEditClick = (itemData: any) => {
  modalRef.value?.dialogVisibleClick(true, itemData)
}
</script>
<style scoped lang="less">
.department {
}
</style>
