import axiosApiInstance from "../../axios";

const actions = {
  async getListChargeLogs({ commit }, payload){
    let data = {
      "limit": 10,
      "page": payload
    }
    let config = {
      method: "POST",
      url: "/cms/charge-log/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200){
        commit('SET_LIST_CHARGE_LOGS', response.data.data.data)
        commit('SET_TOTAL_PAGES', response.data.data.total_pages)
      }
    }
  },
  async createNewChargeLog(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "/cms/charge-log/add",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    return axiosApiInstance(config);
  },
  async updateChargeLog(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/charge-log/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async deactiveChargeLog(_, payload) {
    let config = {
      method: 'POST',
      url: "/cms/charge-log/delete/" + payload,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }
    return axiosApiInstance(config);
  }
}

export default actions
