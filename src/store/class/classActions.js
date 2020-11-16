import axiosApiInstance from "../../axios";

const actions = {
  async getClassBySchoolId({commit}, schoolId) {
    let data = {
      "item_per_page": 20,
      "page": 1
    }
    let config = {
      method: "POST",
      url: "/cms/class/list/" + schoolId.schoolId,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }

    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      commit('SET_LIST_CLASSES', response.data.data.data);
    }
  },
  async addNewClass(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/class/add",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }

    let response = await axiosApiInstance(config)
    console.log(response)
  },
  async getClassInfoById(_, classId) {
    let config = {
      method: "POST",
      url: "/cms/class/" + classId,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      }
    }

    let response = await axiosApiInstance(config);
    return response
  },
  async updateClassInfo(_, payload) {
    let data = {
      ...payload.classInfo
    }
    let config = {
      method: "POST",
      url: "/cms/class/update/" + payload.classId,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }

    let response = await axiosApiInstance(config)
    return response
  },
  async closeClass(_, classId) {
    let config = {
      method: "POST",
      url: "/cms/class/close/" + classId,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      }
    }

    let response = await axiosApiInstance(config)
    return response
  }
}

export default actions
