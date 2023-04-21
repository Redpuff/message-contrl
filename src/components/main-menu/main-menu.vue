<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">博源管理</h2>
    </div>
    <div class="menu">
      <!-- 侧边栏菜单 -->
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isCollapse"
        :default-active="activeDefault"
      >
        <template v-for="item in Menus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 动态组件 -->
              <el-icon
                ><component :is="item.icon.split('-icon-')[1]"
              /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleItemClick(subItem)"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import useAccountLogin from '@/store/login/loginStore'
import { mapPathToMenu } from '@/utils/mapMenu'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
//点击设置url
const handleItemClick = (Item: any) => {
  const url = Item.url

  router.push(url)
}
//获取account信息
const useAccount = useAccountLogin()
const Menus = useAccount.userMenus

defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
//根据url控制menu菜单的action
const route = useRoute()
const actionId = computed(() => {
  return mapPathToMenu(route.path, Menus).toString()
})
const activeDefault = ref(actionId)
</script>
<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
