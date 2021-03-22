import axiosApiInstance from "../../axios";

const actions = {
  addMenu(_, payload) {
    let list = []
    payload.data.forEach((item) => {
      if (item.name !== "" && item.time !== "") {
        if (item.image_url.path !== undefined && item.image_url.type !== "") {
          list.push({
            name: item.name,
            image_url: {
              path: item.image_url.path.split('https://kidbox.vn/media/')[1],
              type: item.image_url.type
            },
            time: item.time
          })
        } else {
          list.push({
            name: item.name,
            time: item.time
          })
        }
      }
    })
    let data = {
      class_room_id: payload.class_room_id,
      date: payload.date,
      data: list,
      note: payload.note
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
  async getMenuByDate({ commit }, payload) {
    let data = {
      class_id: payload.classId,
      date: payload.date.toISOString().split('T')[0]
    }

    let config = {
      method: "POST",
      url: "/cms/menu/get-by-date",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      commit('SET_LIST_IN_DATE', response.data.data)
    }
    return response
  },
  async updateMenu(_, payload) {
    let data = {
      ...payload
    }
    let list = []
    data.submitData.forEach((item) => {
      if (item.image_url.path === "https://kidbox.vn/media/default/no-image.png") {
        list.push({
          name: item.name,
          time: item.time
        })
      } else {
        list.push({
          name: item.name,
          time: item.time,
          image_url: {
            path: item.image_url.path.split('https://kidbox.vn/media/')[1],
            type: item.image_url.type
          }
        })
      }
    })
    let config = {
      method: "POST",
      url: "/cms/menu/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { data: list }
    }

    return axiosApiInstance(config)
  }
}

export default actions
