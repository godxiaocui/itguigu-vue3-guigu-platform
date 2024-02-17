<template>
  <div>
    <p>{{ menuList }}</p>
    <template v-for="(item, index) in menuList" :key="item.path">
      <el-menu-item v-if="!item.children" :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script setup lang="ts">
// 获取父组件的传旨
defineProps(['menuList'])
</script>

<style scoped lang="scss"></style>
