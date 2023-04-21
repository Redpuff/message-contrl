<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="25px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <breadcrumb />

      <headerAccount />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import headerAccount from './header-account/header-account.vue'
import breadcrumb from './breadcrumb/breadcrumb.vue'
//确定侧边栏是否展开
const isFold = ref(true)
//注册自定义事件
const emit = defineEmits(['foldChange'])

const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  //触发自定义事件
  emit('foldChange', isFold.value)
}
</script>
<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
