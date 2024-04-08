<template>
  <Dialog title="员工列表" v-model="dialogVisible" style="width: 60%">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <!-- 搜索 -->
        <ContentWrap>
          <el-form
            class="-mb-15px"
            :model="queryParams"
            ref="queryFormRef"
            :inline="true"
            label-width="68px"
          >
            <el-form-item label="用户名称" prop="username">
              <el-input
                v-model="queryParams.username"
                placeholder="请输入用户名称"
                clearable
                @keyup.enter="handleQuery"
                class="!w-240px"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleQuery">
                <Icon icon="ep:search" />
                搜索
              </el-button>
              <el-button @click="resetQuery">
                <Icon icon="ep:refresh" />
                重置
              </el-button>
              <el-button @click="submit" type="primary">确 定</el-button>
            </el-form-item>
          </el-form>
        </ContentWrap>
        <ContentWrap>
          <el-table v-loading="loading" :data="list" highlight-current-row @row-click="rowClick">
            <el-table-column width="55" align="center">
              <template #default="scope">
                <el-radio :label="scope.row.id" v-model="checkUserId">{{ '' }}</el-radio>
              </template>
            </el-table-column>
            <el-table-column label="用户编号" align="center" key="id" prop="id" />
            <el-table-column
              label="用户名称"
              align="left"
              prop="username"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="用户昵称"
              align="left"
              prop="nickname"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="部门"
              align="left"
              key="deptName"
              prop="deptName"
              :show-overflow-tooltip="true"
            />
            <el-table-column label="手机号码" align="left" prop="mobile" width="160" />
          </el-table>
          <Pagination
            :total="total"
            v-model:page="queryParams.pageNo"
            v-model:limit="queryParams.pageSize"
            @pagination="getList"
          />
        </ContentWrap>
      </el-col>
    </el-row>
  </Dialog>
</template>
<script lang="ts" setup>
import { dateFormatter } from '@/utils/formatTime'
import * as UserApi from '@/api/system/user'

defineOptions({ name: 'SystemUserList' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const props = defineProps({
  sysUserId: {
    type: Number || String,
    default: undefined
  }
})
const emit = defineEmits(['submit'])

const checkUserId = ref()
const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  username: undefined
})
const queryFormRef = ref() // 搜索的表单

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await UserApi.getUserEnablePage(queryParams)
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
  queryFormRef.value?.resetFields()
  handleQuery()
}

const dialogVisible = ref(false) // 弹窗的是否展示
/** 打开弹窗 */
const open = async () => {
  dialogVisible.value = true
  await getList()
}

const rowClick = (row) => {
  checkUserId.value = row.id
}

const submit = () => {
  if (!checkUserId.value) {
    return
  }
  dialogVisible.value = false
  emit('submit', checkUserId.value)
}

defineExpose({ open }) // 提供 open 方法，用于打开弹窗

watch(
  () => props.sysUserId,
  (data) => {
    if (!data) {
      return
    }
    checkUserId.value = data
  },
  {
    immediate: true
  }
)

/** 初始化 */
onMounted(() => {})
</script>
