<template>
  <div class="department">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handelQueryListClick"
      @reset-click="handelResetClick"
    />
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-page-click="handleNewPageClick"
      @edit-click="handelEditClick"
    />
    <pageModal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
import pageSearch from '@/components/page-search/pageSearch.vue'
import pageContent from '@/components/page-content/pageContent.vue'
import pageModal from '@/components/page-modal/pageModal.vue'
import searchConfig from '@/views/main/system/department/config/searchConfig'
import contentConfig from '@/views/main/system/department/config/contentConfig'
import modalConfig from '@/views/main/system/department/config/modalConfig'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { computed } from 'vue'
import userMainStore from '@/store/main/main'

const { contentRef, handelQueryListClick, handelResetClick } = usePageContent()
const { modalRef, handelEditClick, handleNewPageClick } = usePageModal()

const modalConfigRef = computed(() => {
  const mainStore = userMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})
</script>
<style scoped lang="less">
.department {
}
</style>
