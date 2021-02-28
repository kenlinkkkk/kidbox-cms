import axiosApiInstance from "../../axios";
// import qs from 'qs'

export default {
  async changePassword(_,payload) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let data = {
      "username": userInfo.username,
      ...payload
    }

    let config = {
      method: 'POST',
      url: '/api/res_user/change_password',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }

    return axiosApiInstance(config)
  },
  async addNewUser(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/users/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async deleteUserById(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/users/delete/" + payload.userId,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosApiInstance(config)
  },
  async searchUser(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: '/cms/users/list',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async getRoleList({ commit }, payload) {
    let data = {
      limit: payload.limit,
      page: payload.page
    }

    let config = {
      method: 'POST',
      url: '/cms/users/role/list',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    commit('SET_LIST_USER_ROLE', response.data.data.data)
    return axiosApiInstance(config)
  },
  async updateUserInfo(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: '/cms/users/update/' +  payload.userId,
      headers: {
        'Content-type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async getListUserByRole({ commit }, payload) {
    let data = {
      limit: payload.limit,
      page: payload.page,
      role_id: payload.role_id
    }

    let config = {
      method: "POST",
      url: "/cms/users/list",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    let response = await axiosApiInstance(config)

    if (response.status === 200) {
      if (response.data.code === 200) {
        commit('SET_LIST_USER', response.data.data.results)
        commit('SET_PAGINATE', {
          totalPages: response.data.data.total_pages
        })
      }
    }
  }
}
