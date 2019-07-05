const mutations = {
  updatebocaiTypeList(state, v) {
    state.bocaiTypeList = v;
  },
  updatedirection(state,v) {
  	state.direction = v;
  },
  updateisLoading(state,v) {
  	state.isLoading = v;
  },
  updateshowToast(state,v) {
  	state.showToast = v;
  }
}

export default mutations
