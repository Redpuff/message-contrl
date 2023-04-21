<template>
  <div class="login-phone">
    <el-form
      size="large"
      label-position="left"
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formLabelAlign.verification" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const formLabelAlign = reactive({
  phone: '',
  verification: ''
})
</script>
<style scoped lang="less">
.login-phone {
}
</style>
