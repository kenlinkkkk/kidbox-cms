import axiosApiInstance from "../../axios";

const actions = {
  async getScheduleByDate({ commit }, payload) {
    let data = {
      class_id: payload.classId,
      date: payload.date.toISOString().split('T')[0]
    }

    let config = {
      method: "POST",
      url: "/cms/schedule/get-by-date",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    let response = await axiosApiInstance(config)
    if (response.data.code === 200) {
      commit('SET_SCHEDULE_BY_DATE', response.data.data)
    }

    return response.data.data
  },
  async updateSchedule(_, payload) {
    let data = []
    payload.data.forEach((item) => {
      data.push({
        class_room_id: payload.class_room_id,
        date: payload.date.toISOString().split('T')[0],
        start_time: item.start_time,
        end_time: item.end_time,
        name: item.name,
        note: item.note,
        teacher_id: item.teacher_id.id,
        location: item.location
      })
    })
    let config = {
      method: "POST",
      url: "/cms/schedule/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response.data
  },
  async addNewSchedule (_, payload) {
    let data = [];
    payload.data.forEach((item) => {
      data.push({
        class_room_id: payload.class_room_id,
        date: payload.date.toISOString().split('T')[0],
        start_time: item.start_time,
        end_time: item.end_time,
        name: item.name,
        note: item.note,
        teacher_id: item.teacher_id.id,
        location: item.location
      })
    })

    let config = {
      method: "POST",
      url: "/cms/schedule/add-new",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    let response = await axiosApiInstance(config)
    return response.data
  },
  async scheduleByID (_, payload) {
    let config = {
      method: "POST",
      url: "/cms/schedule/get-by-id/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    let response = await axiosApiInstance(config)
    return response.data
  }

}

export default actions
