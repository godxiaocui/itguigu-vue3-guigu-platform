//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './type'

//项目用户相关的请求地址

enum API {
  LOGIN_URL = '/user/login',

  USERINFO_URL = '/user/info',

  LOGOUT_URL = '/admin/acl/index/logout',
}
//登录接口
// 在这个特定的代码片段中，request.post 方法的泛型参数 <T, U> 的顺序是固定的，第一个参数 T 表示请求参数的类型，第二个参数 U 表示请求返回的数据类型。
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)

//退出登录

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
