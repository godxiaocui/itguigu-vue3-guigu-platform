<template>
  <div class="child1">
    <h3>我是子组件1:曹植</h3>
    <h4>{{ car2 }}</h4>
  </div>
</template>

<script setup lang="ts">
import $bus from "../../bus";
//组合式API函数
import { onMounted ,ref} from "vue";
//组件挂载完毕的时候,当前组件绑定一个事件,接受将来兄弟组件传递的数据
let car2=ref('')
onMounted(()=>{
  // 第一个参数 事件类型 第二个参数 事件回调
  $bus.on('car',(car)=>{
    car2.value=car.car
  })
})


</script>

<style scoped>
.child1 {
  width: 300px;
  height: 300px;
  background: hotpink;
}
</style>