<template>
  <ContentWrap>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="180px"
      v-loading="formLoading"
    >
      <el-form-item label="轮盘资格基础金额" prop="baseAmount">
        <el-input v-model="formData.baseAmount" placeholder="请输入轮盘资格基础金额" class="!w-200px"/>
      </el-form-item>
      <el-form-item label="普通轮盘最小积分" prop="minPoint">
        <el-input v-model="formData.minPoint" placeholder="请输入普通轮盘最小积分" class="!w-200px"/>
      </el-form-item>
      <el-form-item label="普通轮盘最大积分" prop="maxPoint">
        <el-input v-model="formData.maxPoint" placeholder="请输入普通轮盘最大积分" class="!w-200px"/>
      </el-form-item>
      <el-form-item label="超级轮盘最小积分" prop="superMinPoint">
        <el-input v-model="formData.superMinPoint" placeholder="请输入超级轮盘最小积分" class="!w-200px"/>
      </el-form-item>
      <el-form-item label="超级轮盘最大积分" prop="superMaxPoint">
        <el-input v-model="formData.superMaxPoint" placeholder="请输入超级轮盘最大积分" class="!w-200px"/>
      </el-form-item>
      <el-form-item label="直接邀请比例" prop="directRatio">
        <el-input-number v-model="formData.directRatio" placeholder="直接邀请比例"/>&nbsp;%
      </el-form-item>
      <el-form-item label="间接邀请比例" prop="indirectRatio">
        <el-input-number v-model="formData.indirectRatio" placeholder="间接邀请比例"/>&nbsp;%
      </el-form-item>
      <el-form-item label="小组目标" prop="teamTargetToken">
        <el-input v-model="formData.teamTargetAmount" placeholder="代币金额" class="!w-100px"/>&nbsp;
        <TokenSelect v-model="formData.teamTargetToken" />
      </el-form-item>
      <el-form-item label="默认父编号" prop="defaultParentId">
        <el-input v-model="formData.defaultParentId" placeholder="请输入默认父编号" class="!w-200px"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary" :disabled="formLoading" size="large">确 定</el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>
</template>
<script setup lang="ts">
import { ConfigApi } from '@/api/promotion/config'
import TokenSelect from '@/views/asset/token/components/TokenSelect.vue'

/** 推广配置 表单 */
defineOptions({ name: 'ConfigForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  id: undefined,
  baseAmount: undefined,
  minPoint: undefined,
  maxPoint: undefined,
  superMinPoint: undefined,
  superMaxPoint: undefined,
  directRatio: undefined,
  indirectRatio: undefined,
  teamTargetToken: undefined,
  teamTargetAmount: undefined,
  defaultParentId: undefined,
})
const formRules = reactive({
  baseAmount: [ { required: true, message: '轮盘资格基础金额不能为空', trigger: 'blur' } ],
  minPoint: [ { required: true, message: '普通轮盘最小积分不能为空', trigger: 'blur' } ],
  maxPoint: [ { required: true, message: '普通轮盘最大积分不能为空', trigger: 'blur' } ],
  superMinPoint: [ { required: true, message: '超级轮盘最小积分不能为空', trigger: 'blur' } ],
  superMaxPoint: [ { required: true, message: '超级轮盘最大积分不能为空', trigger: 'blur' } ],
  directRatio: [ { required: true, message: '直接邀请比例不能为空', trigger: 'blur' } ],
  indirectRatio: [ { required: true, message: '间接邀请比例不能为空', trigger: 'blur' } ],
  teamTargetToken: [ { required: true, message: '小组目标代币不能为空', trigger: 'blur' } ],
  teamTargetAmount: [ { required: true, message: '小组目标代币金额不能为空', trigger: 'blur' } ],
  defaultParentId: [ { required: true, message: '默认父编号不能为空', trigger: 'blur' } ]
})
const formRef = ref() // 表单 Ref

const getConfig = async () => {
  formLoading.value = true
  try {
    formData.value = await ConfigApi.getConfig()
  } finally {
    formLoading.value = false
  }
}

/** 提交表单 */
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown
    await ConfigApi.updateConfig(data)
    message.success(t('common.updateSuccess'))

  } finally {
    formLoading.value = false
  }
}


/** 初始化 **/
onMounted(() => {
  getConfig()
})
</script>
