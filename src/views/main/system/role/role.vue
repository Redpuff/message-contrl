<template>
  <div class="role">
    <pageSearch :search-config="searchConfig" />
  </div>
</template>
<script setup lang="ts">
import pageSearch from '@/components/page-search/pageSearch.vue'
import searchConfig from '@/views/main/system/role/config/searchConfig'
</script>
<style scoped lang="less">
.role {
}
</style>
