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
  getChildByIdClass(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/child/list/",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
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
  getChildDetail(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/child/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return axiosApiInstance(config)
  },
}

export default actions
