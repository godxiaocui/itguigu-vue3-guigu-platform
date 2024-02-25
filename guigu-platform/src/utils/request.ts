//  对axios进行二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关的
import useUserStore from '@/store/modules/user'
// 第一步利用axios的create方法，创建axios实例
//创建axios实例
const request = axios.create({
  // 基础路径上携带api
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, // 请求超时时间
})
//请求拦截器
request.interceptors.request.use((config) => {
  // 获取用户相关的小仓库，获取仓库内部的token
  const userStore = useUserStore()
  if (userStore) {
    //获取用户的token
    const token = userStore.token
    //判断token是否存在
    if (token) {
      //将token设置到请求头中
      config.headers.token = token
    }
  }
  // config是请求的配置对象，我们可以对config进行统一配置
  // 比如：headers 每次发送请求之前，经常需要在headers中携带token
  // 返回配置对象
  return config
})
//响应拦截器
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
