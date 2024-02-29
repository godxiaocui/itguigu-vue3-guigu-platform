// 创建用户的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo,reqLogout } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/tokens'
import { constanRoute } from '@/router/routes' // 引入路由
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户的唯一标识
      menuRoutes: constanRoute, //用户的菜单
      username: '', //用户名
      avatar: '', //用户头像
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
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    },
    async logout() {  
      const result=  await reqLogout()
      if(result.code === 200){
        ;(this.token = ''), (this.avatar = ''), (this.username = '')
        // 删除token
        REMOVE_TOKEN()
        return 'ok'
   
    }else{
      return Promise.reject(new Error(result.message))
    }

  },
}
})
export default useUserStore
