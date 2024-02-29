// 路由鉴权 , 通过路由守卫来实现路由权限设置
// 1.进度条
// 2.路由鉴权(路由组件访问权限设置)
// 2.1 用户未登录，可以访问login 访问非登录页面，跳转到登录页面（login）
// 2.2 用户登录，可以访问所有页面 不能访问login页面
// 3. 
import router from '@/router'
// 进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 获取仓库内的数据,但是在仓库外不能直接用store，需要用pinia提供的useStore
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach( (to, from, next) => {
  // x修改标题
  document.title = to.meta.title + '谷谷平台'
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
      next({path:'/login', query: {redirect: to.path}})
    }
  } else {
    // 刷新会丢失用户信息，这里需要重新获取用户信息
    if (!userStore.username) {
      userStore.userInfo().then(() => {
        next()
      }).catch(async () => {
        // 获取用户信息失败，清除token
        // 指向登录页
        await userStore.logout()
        next({path:'/login', query: {redirect: to.path}})
      })
    } else {
      next()
  }
}
})
// 全局后置守卫
router.afterEach((to, from) => {
  // 进度条关闭
  nprogress.done()
  console.log('跳转到:', to.path)
})
 