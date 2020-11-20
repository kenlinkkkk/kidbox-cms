import axiosApiInstance from "../../axios";

const actions = {
  // type infrastructure ===============================================================================================
  infrastructureTypeAdd(_, payload) {
    let data = {
      status: 1,
      ...payload
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
  infrastructureTypeList(_, payload) {
    let data = {
      page: payload.page,
      limit: payload.limit
    }

    let config = {
      method: "POST",
      url: "/cms/infrastructure/type/list",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    return axiosApiInstance(config)
  },

  //  end type infrastructure ==========================================================================================
}

export default actions
