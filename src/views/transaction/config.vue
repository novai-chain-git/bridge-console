<template>
  <ContentWrap>
    <div v-for="item in list" :key="item.key" class="flex flex-items-center">
      <div>
        <el-text>{{ item.name }}</el-text>
      </div>
      <div class="ml-2">
        <el-input type="number" v-model="item.value" @change="change($event,item.key)"
        />
      </div>
    </div>
  </ContentWrap>
</template>
<script setup lang="ts">
import { TransactionApi } from '@/api/transaction'

/** 推广配置 表单 */
defineOptions({ name: 'ConfigForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const list = ref([]) // 列表的数据

const getConfig = async () => {
  formLoading.value = true
  try {
    list.value = await TransactionApi.getConfig()
  } finally {
    formLoading.value = false
  }
}

const change = async (val, key) => {
  // 提交请求
  formLoading.value = true
  try {
    await TransactionApi.updateConfig({ key: key, value: val })
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
