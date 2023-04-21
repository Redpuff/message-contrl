<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: `${item.path}` }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import useAccountLogin from '@/store/login/loginStore'
import { mapPathToBreadcrumb } from '@/utils/mapMenu'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
//获取路由实例
const route = useRoute()
//获取用户菜单信息
const menus = useAccountLogin()
//获取到用户应该有的菜单
const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, menus.userMenus)
})
</script>
<style scoped lang="less">
.breadcrumb {
}
</style>
