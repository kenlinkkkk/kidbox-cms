import axiosApiInstance from "../../axios";

const actions = {
  async addMenu(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/menu/add",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async deleteMenu(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/menu/delete/" + payload,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return axiosApiInstance(config)
  },
  async getMenuInWeekByDate({ commit }, payload) {
    let data = {
      // class_id: payload.classId,
      class_id: 1,
      date: payload.date.toISOString().split('T')[0]
    }

    let config = {
      method: "POST",
      url: "/cms/menu/get-in-week",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      commit('SET_LIST_MENU_BY_WEEK', response.data.data)
    }
    return response
  },
  async updateMenu(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/menu/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  }
}

export default actions
