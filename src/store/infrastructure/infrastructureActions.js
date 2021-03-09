import axiosApiInstance from "../../axios";

const actions = {
  // type infrastructure ===============================================================================================
  infrastructureTypeAdd(_, payload) {
    let data = {
      status : 1,
      schoolId : parseInt(localStorage.getItem('schoolId')),
      name: payload.name
    }

    let config = {
      method: "POST",
      url: "/cms/infrastructure/type/add",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  async infrastructureTypeList({ commit }, payload) {
    let data = {
      page: payload.page,
      limit: payload.limit,
      schoolId: parseInt(localStorage.getItem('schoolId'))
    }

    let config = {
      method: "POST",
      url: "/cms/infrastructure/type/list",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if (response.status === 200 && response.data.code === 200) {
      if (data.page === 1) {
        commit('SET_LIST_INFRASTRUCTURE_TYPE', response.data.data.data)
      } else {
        commit('APPEND_LIST_INFRASTRUCTURE_TYPE', response.data.data.data)
      }
    }
    return response
  },
  infrastructureTypeDelete(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/infrastructure/type/delete/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    return axiosApiInstance(config)
  },
  infrastructureTypeUpdate(_, payload) {
    let data = {
      name: payload.name
    }

    let config = {
      method: "POST",
      url: "/cms/infrastructure/type/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  //  end type infrastructure ==========================================================================================

  // infrastructure ====================================================================================================
  async getListInfrastructure({ commit },  payload) {
    let data = {
      page: payload.page_number,
      limit: payload.item_per_page,
      typeId: parseInt(payload.typeId),
      schoolId: parseInt(localStorage.getItem('schoolId'))
    }

    let config = {
      method: "POST",
      url: "/cms/infrastructure/list",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    let response = await axiosApiInstance(config)
    if (response.status === 200) {
      if (data.page === 1) {
        commit('SET_LIST_INFRASTRUCTURE', response.data.data.data)
      } else {
        commit('APPEND_LIST_INFRASTRUCTURE', response.data.data.data)
      }
    }

    return response
  },
  getInfrastructureById(payload) {
    let config = {
      method: "POST",
      url: "/cms/infrastructure/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosApiInstance(config)
  },
  updateInfrastructureById(_, payload) {
    let data = {
      ...payload
    }
    console.log(data)
    let config = {
      method: "POST",
      url: "/cms/infrastructure/update/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  addInfrastructure(_, payload) {
    let data = {
      name: payload.name,
      typeId: payload.typeId,
      quantity: payload.quantity,
      unit: payload.unit,
      note: payload.note,
      status: 1
    }

    let config = {
      method: "POST",
      url: "/cms/infrastructure/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return axiosApiInstance(config)
  },
  deleteInfrastructureById(_, payload) {
    let config = {
      method: "POST",
      url: "/cms/infrastructure/delete/" + payload.id,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return axiosApiInstance(config)
  }
  // end infrastructure ================================================================================================
}

export default actions
