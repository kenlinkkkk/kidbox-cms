import axiosApiInstance from "../../axios";

const actions = {
  addNewChild(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/child/add",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  addChildToClass(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/child/add-to-class",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  deleteChild(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/class/close/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return axiosApiInstance(config)
  },
  async getChildByIdClass({ commit }, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/child/list",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      if (response.data.code === 200) {
        commit('SET_LIST_CHILD', response.data.data.data)
        commit('SET_PAGINATE_INFO', response.data.data.total_pages)
      }
    }
    return response.data
  },
  updateChild(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/child/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async getChildDetail({ commit }, payload) {
    let config = {
      method: "POST",
      url: "/cms/child/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      }
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      if (response.data.code === 200) {
        commit('SET_CHILD_INFO', response.data.data.info)
      }
    }
    return response.data
  },

  // health

  async healthAddNew () {

  },

  async healthDelete () {

  },
  async healthUpdate () {

  },
  async healthStatistics ({ commit }, payload) {
    let config = {
      method: "POST",
      url: "/cms/child/heath/heath_statistics",
      data: payload
    }

    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      if (response.data.code === 200) {
        commit("SET_HEALTH_DATA", response.data.data)
      }
    }
    return response.data
  },

  //achievement

  async getAllAchievement ({ commit }, payload) {
    let config = {
      method: "POST",
      url: "/cms/loyal-log/get-all",
      data: payload
    }

    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      if (response.data.code === 200) {
        commit("SET_LIST_ACHIEVEMENT", response.data.data)
      }
    }
  }
}


export default actions

