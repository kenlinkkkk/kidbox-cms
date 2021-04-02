import axiosApiInstance from "../../axios";

const actions = {
  // class info
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
      name: payload.name,
      note: payload.note,
      room: payload.room,
      school_id: payload.school_id
    }

    if (payload.logo_url.path) {
      Object.assign(data, {logo_url: {
          path: payload.logo_url.path.split('https://kidbox.vn/media/')[1],
          type: payload.logo_url.type
        }
      })
    }
    let teacher_ids = []
    payload.teacher_ids.forEach((item) => {
      teacher_ids.push(item.id)
    })
    Object.assign(data, {teacher_ids: teacher_ids})

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
      name: payload.classInfo.name,
      note: payload.classInfo.note,
      logo_url: {
        path: payload.classInfo.logoUrl.path.split('https://kidbox.vn/media/')[1],
        type: payload.classInfo.logoUrl.type
      },
      room: payload.classInfo.room
    }
    let teacher_ids = []
    payload.classInfo.teachers.forEach((item) => {
      teacher_ids.push(item.id)
    })
    Object.assign(data, {teacher_ids: teacher_ids})
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
  },

  // child info

  async getListChildOfClass({ commit }, payload) {
    let data = {
      page: payload.page,
      size: payload.size,
      school_id: payload.school_id,
      class_id: Number(payload.class_id)
    }

    let config = {
      method: "POST",
      url: "/cms/child/list",
      data: data
    }
    let response = await  axiosApiInstance(config)
    if (response.status === 200) {
      if (response.data.code === 200) {
        if (data.page === 1) {
          commit('SET_LIST_STUDENTS', { action: "SET", data: response.data.data.data})
        } else {
          commit('SET_LIST_STUDENTS', { action: "PUSH", data: response.data.data.data})
        }
      } else {
        commit('SET_LIST_STUDENTS', { action: "SET", data: []})
      }
    }
    return axiosApiInstance(config)
  },
  async getCheckinInfo({ commit }, payload) {
    let data = {
      class_id: payload.class_id,
      date: new Date().toISOString().split('T')[0]
    }

    let config = {
      method: "POST",
      url: "/cms/checkin/get-check-in-class",
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      commit('SET_LIST_STUDENTS', { action: "SET", data: response.data.data.data})
    }
    return response.data
  }
}

export default actions
