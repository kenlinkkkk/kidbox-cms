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
  getUserById: state => userId => state.userList.find((user) => user.user.id === userId),

  getParents: state =>{
    let response = []
    if(state.parents.length > 0){
      response.push({
        name: "Tất cả",
        class_id: '',
        id: -1
      })
    }
    state.parents.forEach(item => {
      response.push({
        name: item.name,
        class_id: item.class_id,
        id: item.id
      })
    })
    return response;
  },
  getParent: state => parentId => state.parents.find((parent) => parent.id === parentId),

}

export default getters
