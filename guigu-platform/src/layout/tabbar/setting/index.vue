<template>

<el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
            <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
            <el-button size="small" icon="Setting" circle @click="Setting"></el-button>
            <img src="../../../../public/logo.png" style="width: 24px;height: 24px;margin:0px 10px;border-radius: 50%;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    ceshi
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>


</template>







<script setup lang="ts">





</script>

<style scoped lang="scss">



</style>
