<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <!-- change:选中值发生变化时触发 -->
                <!-- 这里可以双向绑定修改仓库的值-->
                <!-- 同时收集的数据会双向绑定到el-select   即  el-option :value="item.id" 这里的id会赋值给v-model ategoryStore.c1Id-->
              <el-select  v-model="categoryStore.c1Id" @change="handler" style="width: 200px; height: 40px;">
                  <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
                    <el-option
                        v-for="item in categoryStore.c1Arr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
              </el-select>
                    <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
                    
       
            </el-form-item>
            <el-form-item label="二级分类" >
                <el-select v-model="categoryStore.c2Id" @change="handler1" style="width: 200px; height: 40px;">
                    <el-option
                        v-for="item in categoryStore.c2Arr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" style="width: 200px; height: 40px;">
                    <el-option
                        v-for="item in categoryStore.c3Arr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>






<script setup lang="ts">
import useCategoryStore from '@/store/modules/catagory';
import { onMounted } from 'vue';
let categoryStore = useCategoryStore();
// 通知仓库获取一级分类的方法
onMounted(() => {
    getC1();
});
const getC1 = () => {
    categoryStore.getC1();
}
//此方法即为一级分类下拉菜单的change事件(选中值的时候会触发,保证一级分类ID有了)
const handler = () => {
    //需要将二级、三级分类的数据清空
    categoryStore.c2Id = '';
    categoryStore.c3Arr = [];
    categoryStore.c3Id = '';
    //通知仓库获取二级分类的数据
    categoryStore.getC2();
}
//此方法即为二级分类下拉菜单的change事件(选中值的时候会触发,保证二级分类ID有了)
const handler1 = () => {
    //清理三级分类的数据
    console.log('handler1');
    categoryStore.c3Id = '';
    categoryStore.getC3();
}


// //接受父组件传递过来scene
// defineProps(['scene']);

</script>

<style scoped></style>
