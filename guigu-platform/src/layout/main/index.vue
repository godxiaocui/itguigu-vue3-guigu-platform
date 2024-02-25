<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <!-- 渲染layout一级路由器-->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
// pinia仓库数据
import useLayOutSettingStore from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
// 控制当前组件是否销毁
let flag = ref(true)
// 监听仓库内部的刷新按钮的值得变化
// 实现刷新功能
watch(
  () => layOutSettingStore.refsh,
  () => {
    flag.value = false
    // 响应式的变化.等待dom渲染完毕
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<!-- 过渡动画 -->
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
