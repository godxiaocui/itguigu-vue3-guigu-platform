<template>
  <div class="login_container">
    <!--登录页面用el的时候最好用row 比较好做布局-->
    <!--xs当像素小于768 左边不要，只有右边 -->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 要用icon图标，需要引入
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入小仓库
import useUserStore from '@/store/modules/user'
// 引入当前时间
import { getTime } from '@/utils/time'
let userStore = useUserStore()
//获取el-form组件
let loginForms = ref()
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
// 获取路由器
let $router = useRouter()
let $route = useRoute()
// 定义变量控制登录按钮的loading状态
let loading = ref(false)

//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}
//定义表单校验需要配置对象
const rules = {
  //规则对象属性:
  //required,代表这个字段务必要校验的
  //min:文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
  username: [
    // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}

// 登录按钮
const login = async () => {
  // 登录之前保证校验通过
  const result = await loginForms.value.validate()
  console.log(result)
  // loading效果
  loading.value = true
  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    //保证登录成功
    await userStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    // 判断一下是否带有query参数
    let redirect = $route.query.redirect as string
    $router.push({ path: redirect || '/' })
    getTime()
    //登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hi ${getTime()}点了`,
    })
    // loading效果
    loading.value = false
  } catch (error) {
    // loading效果
    loading.value = false
    console.log(error)
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  // 覆盖整个盒子
  background-size: cover;
}
.login_form {
  width: 80%;
  top: 30vh;
  position: relative;
  background: url('@/asssets/images/login_form.png') no-repeat;
  // 覆盖整个盒子
  background-size: cover;
  padding: 40px;
}
h1 {
  color: white;
  font-size: 40px;
}

h2 {
  font-size: 20px;
  color: white;
  margin: 20px 0px;
}
.login_btn {
  width: 100%;
}
</style>
