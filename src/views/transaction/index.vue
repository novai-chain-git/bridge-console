<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="From地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入From地址"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="From网络" prop="fromChain">
        <el-select
          v-model="queryParams.fromChain"
          placeholder="请选择From网络"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.CHAIN_ID)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Token" prop="token">
        <el-input
          v-model="queryParams.token"
          placeholder="请输入Token"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.TRANSACTION_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.TRANSACTION_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="To地址" prop="toAddress">
        <el-input
          v-model="queryParams.toAddress"
          placeholder="请输入To地址"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="To网络" prop="toChain">
        <el-select
          v-model="queryParams.toChain"
          placeholder="请选择To网络"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.CHAIN_ID)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery">
          <Icon icon="ep:search" class="mr-5px"/>
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon icon="ep:refresh" class="mr-5px"/>
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-tabs type="card" v-model="queryParams.tabName" @tab-click="tabClick">
      <el-tab-pane label="全部" name=""/>
      <el-tab-pane label="待审核" name="waitingAudit"/>
      <el-tab-pane label="待转账" name="waitingTransfer"/>
    </el-tabs>

    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="编号" align="center" prop="id"/>
      <el-table-column label="地址" align="left" prop="address" width="420">
        <template #default="scope">
          From: {{ scope.row.address }}
          <br/>
          To: {{ scope.row.toAddress }}
        </template>
      </el-table-column>
      <el-table-column label="Token" align="center" prop="token"/>
      <el-table-column label="类型" align="center" prop="type">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.TRANSACTION_TYPE" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="网络" align="left" prop="fromChain">
        <template #default="scope">
          From:
          <dict-tag :type="DICT_TYPE.CHAIN_ID" :value="scope.row.fromChain"/>
          <br/>
          To:
          <dict-tag :type="DICT_TYPE.CHAIN_ID" :value="scope.row.toChain"/>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="right" prop="amount"/>
      <el-table-column label="手续费" align="right" prop="fee"/>
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.TRANSACTION_STATUS" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        align="left"
        prop="createTime"
        width="220px"
      >
        <template #default="scope">
          创建: {{ formatTime(scope.row.createTime) }}
          <br/>
          审核: {{ formatTime(scope.row.auditTime) }}
          <br/>
          成功: {{ formatTime(scope.row.successTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openAudit(scope.row.id)"
            v-hasPermi="['transaction:audit:success']"
            v-show="scope.row.type === -1 && scope.row.status === 0 "
          >
            审核
          </el-button>
          <el-button
            link
            type="primary"
            @click="openTransfer(scope.row.id)"
            v-hasPermi="['transaction:confirm:transfer']"
            v-show="scope.row.status === 3 "
          >
            人工转账
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <Audit ref="auditRef" @success="getList"/>
  <Transfer ref="transferRef" @success="getList"/>
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { formatTime } from '@/utils/formatTime'
import { TransactionApi } from '@/api/transaction'
import Audit from './Audit.vue'
import Transfer from './Transfer.vue'
import { TabsPaneContext } from "element-plus";

/** 交易 列表 */
defineOptions({ name: 'Transaction' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref([]) // 列表的数据
// 列表的总页数
const total = ref(0)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  address: undefined,
  token: undefined,
  type: undefined,
  fromChain: undefined,
  toChain: undefined,
  toAddress: undefined,
  status: undefined,
  handleTime: [],
  successTime: [],
  auditTime: [],
  createTime: [],
  tabName: undefined,
})
const queryFormRef = ref() // 搜索的表单

const tabClick = async (tab: TabsPaneContext) => {
  if (tab.paneName === 'waitingAudit') {
    queryParams.type = -1
    queryParams.status = 0
  } else if (tab.paneName === 'waitingTransfer') {
    queryParams.type = -1
    queryParams.status = 6
  } else {
    queryParams.type = undefined
    queryParams.status = undefined
  }
  await getList()
}

const auditRef = ref()
const openAudit = async (id: number) => {
  auditRef.value.open(id)
}

const transferRef = ref()
const openTransfer = async (id: number) => {
  transferRef.value.open(id)
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await TransactionApi.getPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
