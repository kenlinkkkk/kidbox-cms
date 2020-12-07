import axiosApiInstance from "../../axios";

const actions = {
  async getListPost(_, payload) {
    let data = {
      item_per_page: 10,
      page_number: 1,
      is_hot: 1,
      school_id: 1,
      key_words: '',
      type_id: 1,
      ...payload
    }

    let config = {
      method: "POST",
      url: "/cms/posts",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }
    let response = await axiosApiInstance(config)
    console.log(response)
    return response
  }
}

export default actions
