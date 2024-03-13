<template>
  <el-form>
    <el-form-item label="spu名称">
      <el-input placeholder="请输入spu名称"></el-input>
    </el-form-item>
    <el-form-item lang="spu品牌">
      <el-select placeholder="请选择品牌">
        <el-option label="华为"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="spu描述">
      <el-input type="textarea" placeholder="请输入spu描述"></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
