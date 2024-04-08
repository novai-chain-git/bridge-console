<template>
  <el-select v-model="tokenCode" placeholder="请选择Token" clearable class="!w-240px">
    <el-option
      v-for="token in tokenOptions"
      :key="token.code"
      :label="token.name"
      :value="token.code"
    >
      <span class="flex items-center gap-x-8px">
        <el-avatar :src="token.icon" size="small" />
        {{ token.name }}
      </span>
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { TokenApi } from '@/api/asset/token'

/** 会员等级选择框 **/
defineOptions({ name: 'TokenSelect' })

const props = defineProps({
  /** 下拉框选中值 **/
  modelValue: {
    type: String,
    default: undefined
  }
})
const emit = defineEmits(['update:modelValue'])

const tokenCode = computed({
  get() {
    return props.modelValue
  },
  set(value: any) {
    emit('update:modelValue', value)
  }
})

const tokenOptions = ref([])

const getList = async () => {
  tokenOptions.value = await TokenApi.getTokenList()
}

/** 初始化 */
onMounted(() => {
  getList()
})
</script>
