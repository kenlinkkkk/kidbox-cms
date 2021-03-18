const getters = {
  getRoles: state => {
    let response = [{
      label: 'Lựa chọn',
      value: 'Lựa chọn'
    }]
    state.userListRoles.forEach(item => {
      response.push({
        label: item.name,
        value: item.id
      })
    })
    return response
  },
  getListUser: state => {
    let response = []
    state.userList.forEach(item => {
      response.push({
        id: item.user.id,
        avatar: item.image_url,
        email: item.email,
        name: item.name,
        status: 'active',
        phoneNumber: item.phone_number,
        role: item.user,
        school: {
          id: item.school_id,
          name: item.school_name,
        }
      })
    })

    return response
  },
  getPaginate: state => {
    return state.paginate
  },
  getUserById: state => userId => state.userList.find((user) => user.user.id === userId)
}

export default getters
