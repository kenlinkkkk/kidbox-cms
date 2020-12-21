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
  }
}

export default getters
