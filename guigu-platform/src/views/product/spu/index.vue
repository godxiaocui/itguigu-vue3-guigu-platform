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
          @click="addSpu"
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
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.spuName}?`"
                width="200px"
                @confirm="deleteSpu(row)"
              >
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
      <!-- 子组件回传一个数据给父组件-->
      <SpuForm v-show="scene === 1" @changeScene="test" ref="spuForm"></SpuForm>
      <!-- 添加sku-->
      <SkuForm ref="sku" v-show="scene === 2" @changeScene="test"></SkuForm>
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
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
import type { SpuData } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import Category from '@/components/Category/index.vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
// 引入分类仓库
import useCategoryStore from '@/store/modules/catagory'
import { ref, watch, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let scene = ref(0) // 0表示三级分类 // 1表示添加spu // 2表示添加sku
let pageNo = ref(1)
let pageSize = ref(3)
let total = ref(100)
// table的spu数据
let records = ref<Records>([])
// 监听三级分类的权限
// 获取子组件
let spuForm = ref<any>()
// 获取子组件sku
let sku = ref<any>()
// sku列表
let skuArr = ref<any>([])
// 是否显示对话框
let show = ref(false)
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
// 添加spu
const addSpu = () => {
  scene.value = 1
  // 点击子组件方法触发数据
  spuForm.value.initAddSpu(categoryStore.c3Id)
}
// 切换场景,父组件接受子组件传来的数据
const test = (obj: any) => {
  scene.value = obj.flag
  // 切换场景的时候重新获取数据
  if (obj.type) {
    //   获取当前数据
    getHasSpu(pageNo.value)
  } else {
    //  skuForm
    getHasSpu()
  }
}
// 编辑spu
const editSpu = (row: SpuData) => {
  scene.value = 1
  // 通过ref获取子组件的方法
  spuForm.value.initHasSpuData(row)
}
// 添加sku
const addSku = (row: SpuData) => {
  scene.value = 2
  // 通过ref获取子组件的方法
  //skuForm.value.initAddSku(categoryStore.c1Id, categoryStore.c2Id, row)
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
//查看SKU列表的数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    //对话框显示出来
    show.value = true
  }
}
//删除已有的SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //获取剩余SPU数据
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//路由组件销毁前，情况仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
