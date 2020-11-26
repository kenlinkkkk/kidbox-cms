import axiosApiInstance from "../../axios";

const actions = {
  async getScheduleInWeek({ commit }, payload) {
    let data = {
      // class_id: payload.classId,
      class_id: 1,
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

}

export default actions
