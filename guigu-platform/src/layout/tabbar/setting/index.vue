<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle @click="Setting"></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// pinia仓库数据
import useLayOutSettingStore from '@/store/modules/setting'
import { useRouter, useRoute } from 'vue-router'
// 获取用户相关的仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
let layOutSettingStore = useLayOutSettingStore()
// 注意两个方法的不同
// $router获取路由器组件，$route获取当前路由组件，获取当前路由组件的路径
let $router = useRouter()
let $route = useRoute()
// 这里监听刷新页面的方法
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}
// 全屏按钮实现
const fullScreen = () => {
  // document.fullscreenElement 判断是否全屏
  if (document.fullscreenElement) {
    // 退出全屏
    document.exitFullscreen()
  } else {
    // 进入全屏
    document.documentElement.requestFullscreen()
  }
}
// 退出登录
const logout = () => {
  //1. 向服务器发送接口退出登录
  //2. 仓库用户相关的数据清空【token｜username｜avatar】
  //3. 跳转到登录页面
  userStore.logout()
  $router.push({ path: '/login', query: { redirect: $route.fullPath } })
}
</script>

<style scoped lang="scss"></style>
