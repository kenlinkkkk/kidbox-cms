const getters = {
  getPromotions: state =>{
    return state.promotions;
  },
  getPromotion: state => promotionId => state.promotions.find((p) => p.id === promotionId),
  getTotalPages: state =>{
    return state.totalPages;
  },
}

export default getters
