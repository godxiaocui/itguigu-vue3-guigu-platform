// 小仓库：防止layout组件相关的配置仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 用户是否折叠菜单
      refsh: false, //仓库控制刷新效果
    }
  },
})

export default useLayOutSettingStore
