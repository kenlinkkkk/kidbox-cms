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
        role: item.user.role_name
      })
    })

    return response
  }
}

export default getters
