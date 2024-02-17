<template>
  <div class="box">
    <h1>作用域插槽{{ todos }}</h1>
    <ul>
      <li v-for="(item, index) in todos" :key="item.id">
        <!--作用域插槽:可以讲数据回传给父组件-->
        <!-- 这里将数据传递给了伏组件，同时在这里父组件又将决定这里slot展示什么-->
        <slot :$row="item" :$index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
//通过props接受父组件传递数据
defineProps(["todos"]);
</script>

<style scoped>
.box {
  width: 100vw;
  height: 400px;
  background: skyblue;
}
</style>