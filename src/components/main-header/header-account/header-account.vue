<template>
  <div class="header-account">
    <!-- 小功能 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link clearOutLine">
          <div class="user-info">
            <el-avatar
              :size="30"
              src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
            />
            <span>heiheihei</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><User /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Setting /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import LocStorage from '@/utils/cache'
import { LOGIN_TOKEN } from '@/globle/constant'

const Router = useRouter()

const loginOut = () => {
  Router.push('/login')
  LocStorage.removeLocStorage(LOGIN_TOKEN)
}
</script>
<style scoped lang="less">
.header-account {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;

  .name {
    margin-left: 8px;
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
.clearOutLine {
  outline: none;
}
</style>
