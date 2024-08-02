<template>
  <div class="change-avatar">

  </div>
</template>
<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'

defineOptions({ name: 'UserAvatar' })

defineProps({
  img: propTypes.string.def('')
})

</script>

<style lang="scss" scoped>
.change-avatar {
  img {
    display: block;
    margin-bottom: 15px;
    border-radius: 50%;
  }
}
</style>
