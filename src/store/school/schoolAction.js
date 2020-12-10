import axiosApiInstance from "../../axios";

const actions = {
  async getListSchool({ commit }) {
    let data = {
      "item_per_page": 20,
      "page": 1
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
  },
  async getSchoolById({ commit }, payload) {
    let config = {
      method: 'POST',
      url: "/cms/core-school/" + payload.schoolId,
      headers: {
        'Content-Type': 'application/json',
      }
    }
    let response = await axiosApiInstance(config);
    if (response.status === 200) {
      commit('SET_SCHOOLS_INFO', [response.data.data]);
    }
    return response.data.data
  }

}

export default actions
