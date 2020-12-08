import axiosApiInstance from "../../axios";

const actions = {
  async getListSubPackages({ commit }, payload){
    let data = {
      "limit": 10,
      "page": payload
    }
    let config = {
      method: "POST",
      url: "/cms/package/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200){
        commit('SET_LIST_SUB_PACKAGES', response.data.data.data)
        commit('SET_TOTAL_PAGES', response.data.data.total_pages)
      }
    }
  },
  async createNewSubPackage(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "/cms/package/add",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    return axiosApiInstance(config);
  },
  async updateSubPackage(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/package/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async deactiveSubPackage(_, payload) {
    let config = {
      method: 'POST',
      url: "/cms/package/delete/" + payload,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }
    return axiosApiInstance(config);
  }
}

export default actions
