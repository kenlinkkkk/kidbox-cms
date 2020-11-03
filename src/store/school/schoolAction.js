import axiosApiInstance from "../../axios";

const actions = {
  async getListSchool() {
    let config = {
      method: "POST",
      url: "/cms/core_school/list",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    return axiosApiInstance(config);
  }
}

export default actions
