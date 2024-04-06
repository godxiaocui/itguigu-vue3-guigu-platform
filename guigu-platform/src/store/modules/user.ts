// 创建用户的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/tokens'
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes' // 引入路由
//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户的唯一标识
      menuRoutes: constantRoute, //用户的菜单
      username: '', //用户名
      avatar: '', //用户头像
      buttons: [], //权限
    }
  },
  getters: {},
  actions: {
    // 登录
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      // 成功 200- token
      if (result.code === 200) {
        this.token = (result.data as string) || ''
        // 保存token到本地
        SET_TOKEN(this.token)
        // 保证返回一个成功的promise，undefine和 null都是成功
        return 'ok'
      } else {
        // 失败返回一个失败的promise
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息
      const result = await reqUserInfo()
      // 获取用户信息成功
      if (result.code === 200) {
        // 保存用户信息
        this.username = result.data.username
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes,
        )
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...asnycRoute, anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        //console.log(router.getRoutes())
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async logout() {
      const result = await reqLogout()
      if (result.code === 200) {
        ;(this.token = ''), (this.avatar = ''), (this.username = '')
        // 删除token
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default useUserStore
