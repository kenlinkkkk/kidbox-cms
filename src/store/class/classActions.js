import axiosApiInstance from "../../axios";

const actions = {
  async getClassBySchoolId({ commit }, payload) {
    let data = {
      limit: payload.limit,
      page: payload.page,
      default: payload.default
    }
    if (payload.name) { Object.assign(data, { name: payload.name })  }

    let config = {
      method: "POST",
      url: "/cms/class/list/" + payload.schoolId,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      if(response.data.code === 200) {
        commit('SET_LIST_CLASSES', response.data.data.data);
      }
    }
    return response.data.data.data
  },
  async addNewClass(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/class/add",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async getClassInfoById(_, classId) {
    let config = {
      method: "POST",
      url: "/cms/class/" + classId,
      headers: {
        'Content-Type': 'application/json',
      }
    }


    return axiosApiInstance(config);
  },
  async updateClassInfo(_, payload) {
    let data = {
      ...payload.classInfo
    }
    let config = {
      method: "POST",
      url: "/cms/class/update/" + payload.classId,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async closeClass(_, classId) {
    let config = {
      method: "POST",
      url: "/cms/class/close/" + classId,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return axiosApiInstance(config)
  }
}

export default actions
