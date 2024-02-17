// vue-router配置路由
import { createRouter, createWebHashHistory } from 'vue-router'
import { constanRoute } from './routes'
// 引入路由配置文件
const router = createRouter({
  // 路由模式
  // createWebHashHistory:hash模式
  history: createWebHashHistory(),
  routes: constanRoute,
  // 滚动行为
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})
export default router
