import axiosApiInstance from "../../axios";

 const actions = {
  async getListSchool({ commit }) {
    let config = {
      method: "POST",
      url: "/cms/core_school/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    let response = await axiosApiInstance(config);
    if (response.status === 200) {
      commit('SET_SCHOOLS_INFO', response.data.data.data);
      return response.data.data.data;
    }
  }
}

export default actions
