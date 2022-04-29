import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    currentUser: null
  }),
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  }
})
