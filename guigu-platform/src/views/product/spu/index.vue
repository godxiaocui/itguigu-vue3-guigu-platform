<template>
  <!-- 三级分类组件-->
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <!-- v-if 和v-show 都可以 但是这里会频繁切换 v-if会销毁组件库 这里建议用v-show-->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
        >
          添加商品
        </el-button>
        <el-table style="margin: 10px 0px" :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="spu名称" prop="spuName"></el-table-column>
          <el-table-column
            label="spu描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="spu操作">
            <!-- row:即为已有的SPU对象 -->
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
              ></el-button>
              <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px">
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 ->,sizes,total 是将size和total顶到了最前面-->
        <!--  @current-change 切换当前页码，因为这里绑定了一个分页查询器，所以可以直接调用查询方法 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <!-- 添加spu-->
      <SpuForm v-show="scene === 1"></SpuForm>
      <!-- 添加sku-->
      <SkuForm v-show="scene === 2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  HasSpuResponseData,
  Records,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import Category from '@/components/Category/index.vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
// 引入分类仓库
import useCategoryStore from '@/store/modules/catagory'
import { ref, watch } from 'vue'
let categoryStore = useCategoryStore()
let scene = ref(1) // 0表示三级分类 // 1表示添加spu // 2表示添加sku
let pageNo = ref(1)
let pageSize = ref(3)
let total = ref(100)
// table的spu数据
let records = ref<Records>([])
// 监听三级分类的权限
watch(
  () => categoryStore.c3Id,
  () => {
    // 必须有三级分类id才能获取数据
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
// 获取三级方法的spu
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let res: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
// 分页器切换页码
const changeSize = (val: number) => {
  pageSize.value = val
  getHasSpu()
}
</script>

<style scoped lang="scss"></style>
