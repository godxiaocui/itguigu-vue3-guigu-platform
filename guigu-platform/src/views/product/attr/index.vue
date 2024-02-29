<template>
    <div>
        <Category></Category>
        <el-card style="margin: 10px 0px;">
            <el-button @click="addAttrValue" :disabled="categoryStore.c3Id ? false : true" type="primary" size="default"
                icon="Plus">添加属性值</el-button>
            <el-table border style="margin:10px 0px" :data="attrList">
                <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName">

                </el-table-column>
                <el-table-column label="属性值名称">


                </el-table-column>
                <el-table-column label="属性值操作" width="120px">

                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
    
    
    
    
    
    
    
<script setup lang="ts">
import { ref, reactive,watch } from 'vue'
import Category from '@/components/Category/index.vue'
// 引入获取属性的接口
import { reqAttr } from '@/api/product/attr'
// 获取分类组件仓库
import useCategoryStore from '@/store/modules/catagory';
import type { AttrResponseData,Attr } from '@/api/product/attr/type'
let categoryStore = useCategoryStore();
let attrList = ref<Attr[]>([])
const addAttrValue = () => {
    console.log('添加属性值')
}
// 监听3级属性的变化
watch(() => categoryStore.c3Id, async (newVal, oldVal) => {
    console.log('c3Id', newVal)
    if (newVal) {
        // 结构数据
        
        const { c1Id, c2Id, c3Id } = categoryStore
        console.log(c1Id, c2Id, c3Id)
        // 获取属性列表
        let result:AttrResponseData=await reqAttr(c1Id, c2Id, c3Id)
        console.log(result)
        if(result.code===200){
            attrList.value = result.data
        }
     
    }
})
</script>
    
<style scoped lang="scss"></style>
    