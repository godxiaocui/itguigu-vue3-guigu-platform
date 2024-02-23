<template>
  <div class="logo" v-if="setting.logoHidden">
    <!-- 自定义标题和图片-->
    <!-- <img src="../../../public/logo.png" alt="" />
    <p>硅谷甄选运营平台</p> -->
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<script lang="ts">
export default{
  name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    color: white;
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
