import axiosApiInstance from "../../axios";

const actions = {
  async getAll({ commit }, payload){
    let data = {
      "limit": payload.limit,
      "page": payload.page
    }
    let config = {
      method: "POST",
      url: "/cms/notification/content/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200){
        commit('SET_LIST_NOTIFICATION_CONTENTS', response.data.data.data)
        commit('SET_TOTAL_PAGES', response.data.data.total_pages)
      }
    }
  },
  async createNew(_, payload) {
    let data = {
      ...payload
    }
    let config = {
      method: 'POST',
      url: "/cms/notification/content/add",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    return axiosApiInstance(config);
  },
  async update(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/notification/content/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async deactivate(_, payload) {
    let config = {
      method: 'POST',
      url: "/cms/notification/content/delete/" + payload,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }
    return axiosApiInstance(config);
  }
}

export default actions
