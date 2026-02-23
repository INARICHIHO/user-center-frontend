<script setup lang="ts">
import BasicLayout from './layouts/BasicLayout.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.init()  // 恢复登录状态
})
</script>

<template>
    <div class="app">
      <BasicLayout />
    </div>
</template>

<style scoped>

</style>
