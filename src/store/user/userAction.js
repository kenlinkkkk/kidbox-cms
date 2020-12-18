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
      ...payload
    }

    let config = {
      method: 'POST',
      url: '/cms/users/role/list',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    let response = axiosApiInstance(config)

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
  async getListUserByRole(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/users/list",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  }
}
