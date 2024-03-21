<template>
  <div>
    <!-- 这里的子组件，需要接受一个值，父组件給子组件传值，如果scene == 0不禁用子组件的选项卡，反之禁用-->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div class="showtable" v-if="scene == 0">
        <el-button
          @click="addAttr"
          :disabled="categoryStore.c3Id ? false : true"
          type="primary"
          size="default"
          icon="Plus"
        >
          添加属性值
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <!-- 这里会是一个组合的标签-->
            <template #="{ row, $index }">
              <el-tag v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="120px">
            <!-- 这里放置按钮-->
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              >
                编辑
              </el-button>
              <el-popconfirm
                :title="`你确定删除${row.attrName}?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 编辑选项卡-->
      <div class="editCard" v-else>
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请你输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttrValue"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <!-- 这里table 有一个需求需要点击按钮就增加一行，就是数据push到空数组中，把数据绑定到这个数组中-->
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <!-- 这里放一个文本框-->
            <template #="{ row, $index }">
              <!-- 这里增加一个blur事件-->
              <!-- 这里:ref可以拿到我们这个input的实例 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入文本对象"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                :ref="(vc: any) => (inputArr[$index] = vc)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 这里数组为空的时候需要禁用按钮-->
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length <= 0"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, nextTick, onBeforeUnmount } from 'vue'
import Category from '@/components/Category/index.vue'
// 引入获取属性的接口
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
// 获取分类组件仓库
import useCategoryStore from '@/store/modules/catagory'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
let attrList = ref<Attr[]>([])
// 定义card组件内容切换变量
let scene = ref<number>(0) //scene=0 显示table  scene=1 代表编辑属性值添加属性值
// 收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增属性的名字
  attrValueList: [], // 新增属性值的列表
  categoryId: categoryStore.c3Id, // 分类id
  categoryLevel: 3,
})
// 准备一个数组将来会放置input实例
let inputArr = ref<any>([])
// 添加属性值按钮
const addAttr = () => {
  // 切换到编辑属性值添加属性值
  scene.value = 1
  // 清空数据
  Object.assign(attrParams, {
    attrName: '', //新增属性的名字
    attrValueList: [], // 新增属性值的列表
    categoryId: '', // 分类id
    categoryLevel: 3,
  })
}
// 添加属性值按钮

const addAttrValue = () => {
  // 点击添加属性值按钮的时候，向数组push一组数据进去
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 控制每一个input的显示和隐藏
  })
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 编辑属性按钮
const updateAttr = (row: Attr) => {
  // 切换到编辑属性值添加属性值
  scene.value = 1
  // attrParams赋值,这里会会有深拷贝的问题,所以我们使用JSON.parse(JSON.stringify(row))
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 删除属性按钮
const deleteAttr = async (id: number) => {
  // 发送请求
  let res = await reqRemoveAttr(id)
  if (res.code === 200) {
    // 提示信息
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    getAttr()
  } else {
    ElMessage({
      message: '删除失败',
      type: 'error',
    })
  }
}
// 取消按钮
const cancel = () => {
  // 切换到编辑属性值添加属性值
  scene.value = 0
  // 清空数据
  Object.assign(attrParams, {
    attrName: '', //新增属性的名字
    attrValueList: [], // 新增属性值的列表
    categoryId: '', // 分类id
    categoryLevel: 3,
  })
}
// 保存按钮
const save = async () => {
  // 点击保存按钮的时候，发送请求
  let res = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    // 保存成功
    cancel()
    getAttr()
    // 提示信息
    ElMessage({
      message: attrParams.id ? '修改成功' : '保存成功',
      type: 'success',
    })
  }
}
// 获取属性值
const getAttr = async () => {
  // 结构数据
  const { c1Id, c2Id, c3Id } = categoryStore
  // 获取属性列表
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrList.value = result.data
  } else {
    ElMessage({
      message: '失败',
      type: 'error',
    })
  }
}
// 修改input的显示和隐藏
const toLook = (row: any, $index: number) => {
  // 非法情况,如果输入框为空，删除这个数据
  if (!row.valueName) {
    // 删除这个数据
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      message: '属性值不能为空',
      type: 'error',
    })
    return
  }
  // 非法情况,不能有重复的属性值
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 删除这个数据
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      message: '属性值不能重复',
      type: 'error',
    })
    return
  }
  row.flag = false
}
// 修改input的显示和隐藏
const toEdit = (row: any, $index: number) => {
  row.flag = true
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
// 监听3级属性的变化
watch(
  () => categoryStore.c3Id,
  (newVal, oldVal) => {
    console.log('c3Id', newVal)
    if (newVal) {
      // 结构数据

      getAttr()
    }
  },
)

// 分类组件销毁的时候，清空数据
onBeforeUnmount(() => {
  //清空仓库的数据
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
