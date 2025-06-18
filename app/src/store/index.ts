import { reactive, readonly } from 'vue'

interface User {
  userName: string | null
}

const user = reactive<User>({
  userName: null
})

const getters = {
  hasUserName: () => !!user.userName,
  getUserName: () => user.userName
}

const mutations = {
  setUserName(name: string) {
    user.userName = name
  }
}

export default {
  state: readonly(user),
  getters,
  mutations
}
