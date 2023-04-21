<template>
  <div class="login-account">
    <el-form
      :rules="rules"
      size="large"
      label-position="left"
      label-width="auto"
      :model="formData"
      style="max-width: 460px"
      ref="formEl"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useAccountLogin from '@/store/login/loginStore'
import type { AccountType } from '../types'
import LocStorage from '@/utils/cache'
//pinia仓库
const useLoginStore = useAccountLogin()
//账号密码
const formData = reactive<AccountType>({
  name: LocStorage.getLocStorage('name') || '',
  password: LocStorage.getLocStorage('password') || ''
})
//表单验证规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    {
      min: 6,
      max: 16,
      message: '账号长度需要6至16位',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^[a-z0-9]+$/i,
      message: '密码需要字母和数字组成',
      trigger: 'bulr'
    }
  ]
})
//获取form表单实例
const formEl = ref<FormInstance>()
//表单规则验证成功后执行的操作
const loginAction = (isRemember: boolean) => {
  formEl.value?.validate((isValiData) => {
    if (isValiData) {
      const name = formData.name
      const password = formData.password
      useLoginStore.accountLoginAction({ name, password }).then((res) => {
        if (isRemember) {
          LocStorage.setLocStorage('name', name)
          LocStorage.setLocStorage('password', password)
        } else {
          LocStorage.removeLocStorage('name')
          LocStorage.removeLocStorage('password')
        }
      })
    } else {
      ElMessage.error('请输入正确的账号密码')
    }
  })
}

defineExpose({
  loginAction
})
</script>
<style scoped lang="less"></style>
