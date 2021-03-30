import axiosApiInstance from "../../axios";

const actions = {
  async getListSchool({ commit }, payload) {
    let data = {
      "limit": payload.limit,
      "page": payload.page,
      "key_word": payload.key_word
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
      if(response.data.code === 200){
        commit('SET_SCHOOLS_INFO', response.data.data.data);
      }
    }
  },
  async updateSchoolInfo(_, payload) {
    let data = {
      name: payload.name,
      address: payload.address,
      email: payload.email,
      phone_number: payload.phone_number,
      school_master: payload.school_master,
      start_time: payload.start_time,
      break_lunch: payload.break_lunch,
      start_afternoon: payload.start_afternoon,
      end_time: payload.end_time
    }

    if (payload.logoUrl.path) {
      Object.assign(data, {logo_url: payload.logo_url})
    }
    if (payload.package.id) {
      Object.assign(data, {package_id: payload.package.id })
    }

    let config = {
      method: 'POST',
      url: "cms/core-school/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async createNewSchool(_, payload) {
    let data = {
      name: payload.name,
      address: payload.address,
      email: payload.email,
      phone_number: payload.phone_number,
      school_master: payload.school_master,
      start_time: payload.start_time,
      break_lunch: payload.break_lunch,
      start_afternoon: payload.start_afternoon,
      end_time: payload.end_time
    }

    if (payload.logo_url.path) {
      Object.assign(data, {logo_url: payload.logo_url})
    }
    if (payload.package_id.id) {
      Object.assign(data, {package_id: payload.package_id.id })
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
