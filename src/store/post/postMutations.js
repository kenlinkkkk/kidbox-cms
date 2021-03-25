const mutations = {
  SET_LIST_POST (state, data) {
    data.forEach((item) => {
      state.posts.push(item)
    })
  }
}


export default mutations
