<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑根据路由的名字和标题动态展示 -->
    <!-- 这里用 v-show 是因为v-if的级别比 v-for高，会导致v-for失效-->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin-right: 10px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// 引入路由
import { useRoute } from 'vue-router'
// 引入仓库
import useLayOutSettingStore from '@/store/modules/setting'
let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped lang="scss"></style>
