<template>
  <div class="modal">
    <el-dialog
      v-model="isDialog"
      :title="isEdit ? '编辑部门' : '创建部门'"
      width="30%"
      center
    >
      <div class="dalog-input">
        <el-form
          ref="formRef"
          label-width="80px"
          :model="dialogFormData"
          style="max-width: 400px"
        >
          <el-form-item label="部门">
            <el-input
              v-model="dialogFormData.name"
              prop="name"
              placeholder="部门"
            />
          </el-form-item>
          <el-form-item label="领导姓名">
            <el-input
              v-model="dialogFormData.leader"
              prop="leader"
              placeholder="请输入领导姓名"
            />
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select
              v-model="dialogFormData.parentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelClick">取消</el-button>
          <el-button @click="confirmClick" type="primary"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import userSystem from '@/store/main/system/system'
import useMainStore from '@/store/main/main'
import type { FormInstance } from 'element-plus'
import { storeToRefs } from 'pinia'

const dialogFormData = reactive<Record<string, any>>({
  name: '',
  leader: '',
  parentId: ''
})
//用户ID
const Id = ref()
//form实例
const formRef = ref<FormInstance>()
//是否打开对话框
const isDialog = ref<boolean>(false)
//显示创建还是编辑
const isEdit = ref<boolean>(false)
//system的pinia
const systemStory = userSystem()
//创建与取消
const confirmClick = () => {
  isDialog.value = false
  if (!isEdit.value) {
    systemStory.createPageAction('department', dialogFormData)
  } else {
    systemStory.editUpdatePageAction('department', Id.value, dialogFormData)
  }
}
const cancelClick = () => {
  for (const key in dialogFormData) {
    dialogFormData[key] = ''
  }

  isDialog.value = false
}

//获取部门列表和用户列表
const entrieMainData = useMainStore()
const { entireDepartments } = storeToRefs(entrieMainData)
//显示模态框，传入用户参数
const dialogVisibleClick = (isEditUser: boolean, userInfo?: any) => {
  //是否显示模态框
  console.log(2)

  isDialog.value = true
  if (isEditUser && userInfo) {
    isEdit.value = true
    Id.value = userInfo.id
    for (const key in dialogFormData) {
      dialogFormData[key] = userInfo[key]
    }
  } else {
    isEdit.value = false
  }
}

defineExpose({ dialogVisibleClick })
</script>
<style scoped lang="less">
.modal {
}
</style>
