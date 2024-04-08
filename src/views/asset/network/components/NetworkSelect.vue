<template>
  <el-select v-model="netId" placeholder="请选择Network" clearable class="!w-240px">
    <el-option
      v-for="network in networkOptions"
      :key="network.netId"
      :label="network.name"
      :value="network.netId"
    >
      <span class="flex items-center gap-x-8px">
        <el-avatar :src="network.icon" size="small" />
        {{ network.name }}
      </span>
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { NetworkApi } from '@/api/asset/network'

/** 会员等级选择框 **/
defineOptions({ name: 'NetworkSelect' })

const props = defineProps({
  /** 下拉框选中值 **/
  modelValue: {
    type: Number,
    default: undefined
  }
})
const emit = defineEmits(['update:modelValue'])

const netId = computed({
  get() {
    return props.modelValue
  },
  set(value: any) {
    emit('update:modelValue', value)
  }
})

const networkOptions = ref([])

const getList = async () => {
  networkOptions.value = await NetworkApi.getNetworkList()
}

/** 初始化 */
onMounted(() => {
  getList()
})
</script>
