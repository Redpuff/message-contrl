<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handelQueryListClick"
      @reset-click="handelResetClick"
    />
    <pageContent
      :content-config="contentConfig"
      @edit-click="handleNewPageClick"
      @new-page-click="handelEditClick"
      ref="contentRef"
    />

    <pageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>
<script setup lang="ts">
import pageSearch from '@/components/page-search/pageSearch.vue'
import pageContent from '@/components/page-content/pageContent.vue'
import pageModal from '@/components/page-modal/pageModal.vue'
import searchConfig from './config/searchConfig'
import contentConfig from './config/contentConfig'
import modalConfig from './config/modalConfig'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

const { contentRef, handelQueryListClick, handelResetClick } = usePageContent()
const { modalRef, handelEditClick, handleNewPageClick } = usePageModal()
</script>
<style scoped lang="less">
.role {
}
</style>
