const mutations = {
  SET_LIST_PROMOTIONS(state, promotions) {
    state.promotions = promotions;
  },
  UPDATE_PROMOTION(state, promotion){
    state.promotion = promotion;
  },
  ADD_PROMOTION (state, promotion) {
    state.promotions.unshift(promotion)
  },
  SET_TOTAL_PAGES(state, totalPages){
    state.totalPages = totalPages
  }
}

export default mutations
