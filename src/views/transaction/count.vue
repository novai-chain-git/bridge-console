<template>
  <el-row :gutter="20">
    <!-- 左侧部门树 -->
    <el-col :span="8" :xs="24">
      <ContentWrap class="h-1/1">
        <el-form
          class="-mb-15px"
          :model="queryParams"
          ref="queryFormRef"
          :inline="true"
          :rules="formRules"
          label-width="68px"
        >
          <el-form-item prop="createTime">
            <el-date-picker
              v-model="queryParams.createTime"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item prop="address">
            <el-input
              v-model="queryParams.address"
              placeholder="请输入钱包地址"
              type="textarea"
              rows="30"
              clearable
              class="!w-400px"
            />
          </el-form-item>
          <el-form-item class="w100%">
            <el-button size="large" @click="handleQuery" class="mx-auto">
              <Icon icon="ep:search"/>
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </ContentWrap>
    </el-col>
    <el-col :span="16" :xs="24">
      <ContentWrap>
        <div class="flex flex-items-center">
          <div style="width: 100px;text-align: right">
            <el-text>入金</el-text>
          </div>
          <div class="ml-4">
            <el-text type="danger" size="large">{{ inAmount }}</el-text>
          </div>
        </div>
        <div class="flex flex-items-center mt2">
          <div style="width: 100px;text-align: right">
            <el-text>申请出金</el-text>
          </div>
          <div class="ml-4">
            <el-text type="danger" size="large">{{ outAmount }}</el-text>
          </div>
        </div>
        <div class="flex flex-items-center mt2">
          <div style="width: 100px;text-align: right">
            <el-text>实际出金</el-text>
          </div>
          <div class="ml-4">
            <el-text type="danger" size="large">{{ realOutAmount }}</el-text>
          </div>
        </div>
      </ContentWrap>
      <ContentWrap>
        <el-table v-loading="loading" :data="list">
          <el-table-column label="钱包地址" align="left" prop="address" width="500"/>
          <el-table-column label="入金" align="left" prop="inAmount"/>
          <el-table-column label="申请出金" align="left" prop="outAmount"/>
          <el-table-column label="实际出金" align="left" prop="realOutAmount"/>
        </el-table>
      </ContentWrap>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import download from '@/utils/download'
import {TransactionApi} from '@/api/transaction'

defineOptions({name: 'SystemUser'})

const message = useMessage() // 消息弹窗
const {t} = useI18n() // 国际化

const inAmount = ref(0)
const realOutAmount = ref(0)
const outAmount = ref(0)

const list = ref([]) // 列表的数
const queryParams = reactive({
  address: undefined,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const formRules = reactive({
  address: [{required: true, message: '钱包地址不能为空', trigger: 'change'}],
  createTime: [{required: true, message: '交易时间不能为空', trigger: 'change'}]
})
/** 查询列表 */
const getList = async () => {
  try {
    const data = await TransactionApi.count(queryParams)
    inAmount.value = data.inAmount
    outAmount.value = data.outAmount
    realOutAmount.value = data.realOutAmount
    list.value = data.list
  } finally {
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  getList()
}

/** 导出按钮操作 */
const exportLoading = ref(false)
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await UserApi.exportUser(queryParams)
    download.excel(data, '统计.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 */
onMounted(() => {
})
</script>
