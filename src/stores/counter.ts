import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

// PublicState 类型定义
interface usePublicStoreIn {
  userMsg: (string | number)[],
  name: string | number
}

// 'Public' 是store的名字,也是唯一id,是链接store与devtools的桥梁
export const usePublicStore = defineStore('Public', { // 定义一个名为Public的store
  state: (): usePublicStoreIn => {
    return {
      userMsg: [1, 2, 3, 4, 5, '2423423'],
      name: 'tom'
    }
  },
  getters: {
    getUserMsg(state) {
      return state.userMsg
    }
  },
  actions: {
    getName() {
      return this.name
    }
  }
})

// 定义 store 时,可以传入一个 setup 函数,该函数可以暴露属性和方法,供外部调用
export const useUserInfoStore = defineStore('UserInfo', () => {
  const user = reactive({
    name: '张三',
    age: 18,
    hobby: ['吃饭', '睡觉', '打豆豆']
  })

  function changeName(name: string) {
    user.name = name
  }

  return {
    user,
    changeName
  }
})
