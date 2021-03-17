import axiosApiInstance from "../../axios";

const actions = {
  async getScheduleInWeek({ commit }, payload) {
    let data = {
      class_id: payload.classId,
      // class_id: 1,
      date: payload.date.toISOString().split('T')[0]
    }

    let config = {
      method: "POST",
      url: "/cms/schedule/get-in-week",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      commit('SET_WEEK_SCHEDULES', response.data.data)
    }
    return response
  },
  async getScheduleByDate({ commit }, payload) {
    let data = {
      class: payload.classId,
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
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/schedule/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  }

}

export default actions
