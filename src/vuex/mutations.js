const mutations = {
  updatebocaiTypeList(state, v) {
    state.bocaiTypeList = v;
  },
  updatedirection(state,v) {
  	state.direction = v;
  },
  updateisLoading(state,v) {
  	state.isLoading = v;
  }
}

export default mutations
