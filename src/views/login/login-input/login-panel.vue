<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <!-- 登录框 -->
      <el-tabs v-model="activeName" type="border-card" stretch>
        <!-- 账号登录  -->
        <el-tab-pane name="0">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <loginAccount ref="AccountChild"></loginAccount>
        </el-tab-pane>
        <!-- 手机登录 -->
        <el-tab-pane name="1">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <loginPhone></loginPhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="controls">
      <el-checkbox v-model="rememberPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="submitForm"
      >立即登录</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import loginPhone from './login-phone.vue'
import loginAccount from './login-account.vue'
import LocStorage from '@/utils/cache'
//是否记住密码
const rememberPwd = ref<boolean>(LocStorage.getLocStorage('rememberPwd'))
watch(rememberPwd, (newValue) => {
  LocStorage.setLocStorage('rememberPwd', newValue)
})
//定位tabs标签位置
const activeName = ref('0')
//获取子组件的TS声明
const AccountChild = ref<InstanceType<typeof loginAccount>>()
//表单提交
const submitForm = () => {
  AccountChild.value?.loginAction(rememberPwd.value)
}
</script>
<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
