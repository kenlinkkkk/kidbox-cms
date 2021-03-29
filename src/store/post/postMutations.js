const mutations = {
  SET_LIST_POST (state, data) {
    data.forEach((item) => {
      state.posts.push(item)
    })
  },
  SET_POST_DETAIL(state, data) {
    state.postDetail = data
  }
}


export default mutations
