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
    payload
    let data = {
      login: payload.login,
      full_name: payload.full_name,
      email: payload.email,
      mobile: payload.phone_number,
      address: payload.address,
      school_id: payload.school_id,
      status: 1,
    }
    if (payload.role) {
      Object.assign(data, {role: payload.role})
    }
    if (payload.class_id) {
      Object.assign(data, {class_id: payload.class_id})
    }
    let config = {
      method: 'POST',
      url: '/cms/users/update/' +  payload.user.id,
      headers: {
        'Content-type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },

  async getListUserByRole({ commit }, payload) {

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


    let response = await axiosApiInstance(config)

    if (response.status === 200) {
      if (response.data.code === 200) {
        commit('SET_LIST_USER', response.data.data.results)
        commit('SET_PAGINATE', {
          totalPages: response.data.data.total_pages
        })
      }
    }
  },
  async getDetailById(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/users/detail/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let response = await axiosApiInstance(config)
    return response.data
  },


  async getUserByClass({ commit }, payload){

    let data = {
      "class_ids": payload.class_ids,
      "name": payload.name,
    }
    let config = {
      method: "POST",
      url: "/cms/users/get-user-by-class",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200) {
        commit('SET_LIST_PARENTS', response.data.data)
      }else{
        commit('SET_LIST_PARENTS', [])
      }
    }
  },


}
