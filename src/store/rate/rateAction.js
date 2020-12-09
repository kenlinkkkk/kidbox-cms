import axiosApiInstance from "../../axios";

const actions = {

  async getListRules({ commit }){
      let data = {
        "item_per_page": 10,
        "page_number": 1
      }
      let config = {
          method: "POST",
          url: "/cms/rate/get-rules",
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
          data: data
      }
      let response = await axiosApiInstance(config)
      if(response.status === 200){
        if(response.data.code === 200){
          commit('SET_LIST_RULES', response.data.data.data)
        }
      }
  },
  async scrollRule({ commit }, payload){
    let data = {
      "item_per_page": 10,
      "page_number": payload.page_number
    }
    let config = {
      method: "POST",
      url: "/cms/rate/get-rules",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200){
        commit('SET_SCROLL_RULES', response.data.data.data)
      }
    }
  },

  async getRatesByRule({ commit }, payload){
    let data = ''
    if(payload.ruleId === 'all') {
      data = {
        "item_per_page": payload.item_per_page,
        "page_number": payload.page_number,
      }
    } else {
      data = {
        "item_per_page": payload.item_per_page,
        "page_number": payload.page_number,
        "rule_id": payload.ruleId
      }
    }
    let config = {
        method: "POST",
        url: "/cms/rate/get-rate-log-by-rule",
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
        data: data
    }
    let response = await axiosApiInstance(config)
    console.log(response)

    if(response.status === 200){
      if(response.data.code === 200) {
        commit('SET_LIST_RATES', response.data.data.data)
        commit('SET_STATISTICAL', response.data.data.statistical)
      }else{
        commit('SET_LIST_RATES', [])
        commit('SET_STATISTICAL', [])
      }
    }
  },

  async scrollRates({ commit }, payload){
    let data = ''
    if(payload.ruleId === 'all') {
      data = {
        "item_per_page": payload.item_per_page,
        "page_number": payload.page_number,
      }
    } else {
      data = {
        "item_per_page": payload.item_per_page,
        "page_number": payload.page_number,
        "rule_id": payload.ruleId
      }
    }
    let config = {
        method: "POST",
        url: "/cms/rate/get-rate-log-by-rule",
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
        data: data
    }
    let response = await axiosApiInstance(config)
    if(response.status === 200){
      if(response.data.code === 200) {
        commit('SET_CROLL_RATES', response.data.data.data)
      }
    }
  },
  async createNewRule(_, payload) {
    let data = {
      "name": payload.name,
      "has_point": payload.has_point.toString()
    }

    let config = {
      method: 'POST',
      url: "/cms/rate/add-new",
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    return axiosApiInstance(config);
  },
  async updateRule(_, payload) {
    let data = {
      ...payload
    }

    let config = {
      method: 'POST',
      url: "cms/rate/update/" + data.id,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    return response
  },
  async deactiveRule(_, payload) {
    let config = {
      method: 'POST',
      url: "/cms/rate/cancel/" + payload,
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
    }
    return axiosApiInstance(config);
  }
}

export default actions
