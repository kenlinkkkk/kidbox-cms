import axiosApiInstance from "../../axios";

 const actions = {
  async getListSchool({ commit }) {
    let data = {
      "item_per_page": 20,
      "page": 0
    }
    let config = {
      method: "POST",
      url: "/cms/core_school/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
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
      url: "cms/core_school/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    console.log(config)
    let response = await axiosApiInstance(config)
    console.log(response)
  }
}

export default actions
