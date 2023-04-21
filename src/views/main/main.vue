<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '55px' : '200px'">
        <main-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'

import { ref } from 'vue'
// 确定侧边栏是否折叠
const isCollapse = ref(false)
//给mainHeader传入事件，修改子传父修改isCollapse
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = !isFold
}
</script>
<style scoped lang="less">
.main {
  height: 100vh;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
