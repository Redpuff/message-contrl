<template>
  <div class="search">
    <!-- 搜索收集 -->
    <el-form size="large" ref="formRef" :model="searchForm" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入要查询的用户名"
              v-model="searchForm.name"
            /> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入真实姓名"
              v-model="searchForm.realname"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              placeholder="请输入手机号码"
              v-model="searchForm.cellphone"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="日期" prop="creatAt">
            <el-date-picker
              range-separator="到"
              v-model="searchForm.creatAt"
              type="daterange"
              placeholder="请选择日期"
              style="width: 100%"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 搜索按钮 -->
    <div class="btns">
      <el-button :icon="RefreshRight" @click="handleReset">重置</el-button>

      <el-button type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RefreshRight } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus/es/components/form'
//获取search的数据
const searchForm = reactive<Record<string, any>>({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
//注册自定义事件
const emit = defineEmits(['resetClick', 'queryClick'])
//定义form表单的类型
const formRef = ref<FormInstance>()
//重置form表单
const handleReset = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}

const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>
<style scoped lang="less">
.search {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
.btns {
  text-align: right;
}
</style>
