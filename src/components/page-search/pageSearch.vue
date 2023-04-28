<template>
  <div class="search">
    <!-- 搜索收集 -->
    <el-form size="large" ref="formRef" :model="searchForm" label-width="120px">
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  range-separator="到"
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  placeholder="请选择日期"
                  style="width: 100%"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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
interface Iprops {
  searchConfig: {
    formItems: any[]
  }
}

const props = defineProps<Iprops>()
const initialForm: any = {}

for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}

//获取search的数据
const searchForm = reactive<Record<string, any>>(initialForm)
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
