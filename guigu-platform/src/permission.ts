// 路由鉴权 , 通过路由守卫来实现路由权限设置
import router from '@/router'
// 进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to: 要去的路由
  // from: 来自哪个路由
  // next: 函数，是否放行
  // 获取token
  nprogress.start()
  const token = localStorage.getItem('TOKEN')
  // 如果没有token
  if (!token) {
    // 如果要去的是登录页
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// 全局后置守卫
router.afterEach((to, from) => {
  // 进度条关闭
  nprogress.done()
  console.log('跳转到:', to.path)
})
