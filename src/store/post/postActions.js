import axiosApiInstance from "../../axios";

const actions = {
  async getListPost(_, payload) {
    let data = {
      is_hot: 1,
      school_id: 1,
      type_id: 1,
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/posts/",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    console.log(response)
    return axiosApiInstance(config)
  },
  async addNewPost(payload) {
    let data = {
      type_id: 1,
      title: payload.title,
      content: payload.content,
      is_hot: payload.is_hot === "" ? 0 : 1,
      pictures: payload.pictures,
      background: payload.pictures[Math.random(payload.pictures.length() - 1)]
    }

    let config = {
      method: "POST",
      url: "/cms/posts/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async addNewEvent(payload) {
    let data = {
      type_id: 2,
      start_time: payload.start_time,
      end_time: payload.end_time,
      address: payload.address,
      fare: payload.fare,
      organizational_units: payload.organizational_units,
      title: payload.title,
      content: payload.content,
      is_hot: payload.is_hot === "" ? 0 : 1,
      pictures: payload.pictures,
      background: payload.pictures[Math.random(payload.pictures.length() - 1)]
    }

    let config = {
      method: "POST",
      url: "/cms/posts/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async addNewNews(payload) {
    let data = {
      type_id: 3,
      title: payload.title,
      content: payload.content,
      is_hot: payload.is_hot === "" ? 0 : 1,
      background: payload.background
    }

    let config = {
      method: "POST",
      url: "/cms/posts/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async updatePost(payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/posts/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async detailPost(payload) {
    let config = {
      method: "POST",
      url: "/cms/posts/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }
0
    return axiosApiInstance(config)
  }
}

export default actions
