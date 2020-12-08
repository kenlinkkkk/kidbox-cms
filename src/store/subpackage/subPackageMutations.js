const mutations = {
  SET_LIST_SUB_PACKAGES(state, packages) {
    state.packages = packages;
  },
  UPDATE_SUB_PACKAGES(state, packageItem){
    state.subpackage = packageItem;
  },
  ADD_SUB_PACKAGES (state, packageItem) {
    state.packages.unshift(packageItem)
  },
  SET_TOTAL_PAGES(state, totalPages){
    state.totalPages = totalPages
  }
}

export default mutations
