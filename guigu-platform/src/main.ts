import { createApp } from 'vue'
import App from '@/App.vue'
// 引入elment plus 与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 获取应用实例对象
const app = createApp(App)
// 应用挂载节点
app.use(ElementPlus, {
  locale: zhCn,
})
// svg配置代码
import 'virtual:svg-icons-register'

// svg全局配置代码
// 引入自定义插件对象：注册整个项目的全局组件
import gloablComponent from './components/index'
// 安装自定义插件
app.use(gloablComponent)

//引入模版的全局样式
import '@/styles/index.scss'

// 测试代码，测试假接口
import axios from 'axios'
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})

// 引入路由
import router from '@/router/index'
app.use(router)

// 引入仓库
import pinia from './store'
app.use(pinia)

// 获取开发环境的变量
console.log(import.meta.env)
app.mount('#app')
