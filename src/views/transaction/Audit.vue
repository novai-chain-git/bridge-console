<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="From地址" prop="address">
        {{ formData.address }}
      </el-form-item>
      <el-form-item label="To地址" prop="toAddress">
        {{ formData.toAddress }}
      </el-form-item>
      <el-form-item label="Token" prop="token">
        {{ formData.token }}
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        {{ formData.amount }}
      </el-form-item>
      <el-form-item label="To网络" prop="toChain">
        <dict-tag :type="DICT_TYPE.CHAIN_ID" :value="formData.toChain"/>
      </el-form-item>
      <el-form-item label="申请时间" prop="createTime">
        {{ formatTime(formData.createTime) }}
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">审核通过</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { TransactionApi } from '@/api/transaction'
import { formatTime } from "@/utils/formatTime";

/** 交易 表单 */
defineOptions({ name: 'Form' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  id: undefined,
  address: undefined,
  token: undefined,
  toChain: undefined,
  toAddress: undefined,
  amount: undefined,
  createTime: undefined
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('审核')
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await TransactionApi.get(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits([ 'success' ]) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 提交请求
  formLoading.value = true
  try {
    await TransactionApi.auditSuccess(formData.value.id)
    message.success(t('common.updateSuccess'))
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    address: undefined,
    token: undefined,
    toChain: undefined,
    toAddress: undefined,
    amount: undefined,
    createTime: undefined,
  }
  formRef.value?.resetFields()
}
</script>
