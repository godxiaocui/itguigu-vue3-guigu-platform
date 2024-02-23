// 小仓库：防止layout组件相关的配置仓库
import {defineStore} from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            fold: false, // 用户是否折叠菜单
        }
    }
})

export default useLayOutSettingStore