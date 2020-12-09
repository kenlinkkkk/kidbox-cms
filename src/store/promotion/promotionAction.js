import axiosApiInstance from "../../axios";

const actions = {
  async getPromotions({ commit }, payload){
    let data = {
      "limit": payload.limit,
      "page": payload.page
    }
    let config = {
      method: "POST",
      url: "/cms/promotion/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200){
        commit('SET_LIST_PROMOTIONS', response.data.data.data)
        commit('SET_TOTAL_PAGES', response.data.data.total_pages)
      }
    }
  },
  async createNewPromotion(_, payload) {
    let data = {
      ...payload
    }
    console.log(payload)
    let config = {
      method: 'POST',
      url: "/cms/promotion/add",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    return axiosApiInstance(config);
  },
  async updatePromotion(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/promotion/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async deactivePromotion(_, payload) {
    let config = {
      method: 'POST',
      url: "/cms/promotion/delete/" + payload,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }
    return axiosApiInstance(config);
  }
}

export default actions
