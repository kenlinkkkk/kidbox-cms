import axiosApiInstance from "../../axios";

const actions = {
  async getListSchool({ commit }) {
    let data = {
      "item_per_page": 20,
      "page": 0
    }
    let config = {
      method: "POST",
      url: "/cms/core-school/list",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config);
    if (response.status === 200) {
      commit('SET_SCHOOLS_INFO', response.data.data.data);
    }
  },
  async updateSchoolInfo(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/core-school/update/" + data.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async createNewSchool(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "/cms/core-school/add",
      headers: {
        'Content-Type': 'application/json',
      },
      data
    }

    return axiosApiInstance(config);
  }
}

export default actions
