<template>
  <div>
    <h1>我是一级路由展示数据</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped lang="scss"></style>
