<template>
  <div class="modal">
    <el-dialog
      v-model="isDialog"
      :title="
        isEdit ? modalConfig.header.editTitle : modalConfig.header.newTitle
      "
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
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="dialogFormData[item.prop]"
                  :prop="item.prop"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'selection'">
                <el-select
                  v-model="dialogFormData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </template>
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
interface Iprops {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}

const props = defineProps<Iprops>()

//遍历需要的属性

const initialFromData: any = {}

for (const item of props.modalConfig.formItems) {
  initialFromData[item.prop] = ''
}
const dialogFormData = reactive<Record<string, any>>(initialFromData)
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
    systemStory.createPageAction(props.modalConfig.pageName, dialogFormData)
  } else {
    systemStory.editUpdatePageAction(
      props.modalConfig.pageName,
      Id.value,
      dialogFormData
    )
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
