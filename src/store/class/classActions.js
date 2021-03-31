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
  }
}

export default actions
