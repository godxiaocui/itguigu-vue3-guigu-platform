<template>
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Fold':'Expand'"> </component>
    </el-icon>
    <!-- 左侧面包屑-->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item> 权限管理</el-breadcrumb-item>
        <el-breadcrumb-item> 用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>







<script setup lang="ts">

// 引入仓库
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore=useLayOutSettingStore()
const changeIcon=()=>{
    LayOutSettingStore.fold=!LayOutSettingStore.fold
}




</script>

<style scoped lang="scss"></style>
