export default {
  namespaced: true,
  state: {
    num:0
  },
  getters: {
    
  },
  mutations: {
    addNum(state, p){
        console.log("@@@@@@@", state, p)
        state.num = state.num+1;
    }
  },
  actions:{
    addNumAction({commit, state}, p){
        commit("addNum", 1)
    }
  }
}
