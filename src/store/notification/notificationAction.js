import axiosApiInstance from "../../axios";

const actions = {
  async getNotifications({ commit }, payload){
    let data = {
      "limit": payload.limit,
      "page": payload.page
    }
    let config = {
      method: "POST",
      url: "/cms/notification/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200){
        commit('SET_LIST_NOTIFICATIONS', response.data.data.data)
        commit('SET_TOTAL_PAGES', response.data.data.total_pages)
      }
    }
  },
  async createNewNotification(_, payload) {
    let data = {
      ...payload
    }
    let config = {
      method: 'POST',
      url: "/cms/notification/add",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    return axiosApiInstance(config);
  },
  async updateNotification(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/notification/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async deactiveNotification(_, payload) {
    let config = {
      method: 'POST',
      url: "/cms/notification/delete/" + payload,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }
    return axiosApiInstance(config);
  }
}

export default actions
