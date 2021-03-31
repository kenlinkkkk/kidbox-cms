const getters = {
  getRoles: state => listRole => {

    let response = [{
      label: 'Lựa chọn',
      value: 'Lựa chọn'
    }]
    state.userListRoles.forEach(item => {
      if (!listRole.includes(item.id)) {
        response.push({
          label: item.name,
          value: item.id
        })
      }
    })
    return response
  },
  getListUser: state => {
    let response = []
    state.userList.forEach(item => {
      if (item.image_url) {
        response.push({
          id: item.user.id,
          avatar: item.image_url,
          email: item.email,
          name: item.full_name,
          status: 'active',
          phoneNumber: item.phone_number,
          role: item.user,
          login: item.login,
          school: {
            id: item.school_id,
            name: item.school_name,
          }
        })
      } else {
        response.push({
          id: item.user.id,
          avatar: {
            path: "https://kidbox.vn/media/default/no-image.png",
            type: "png"
          },
          email: item.email,
          name: item.full_name,
          status: 'active',
          phoneNumber: item.phone_number,
          role: item.user,
          login: item.login,
          school: {
            id: item.school_id,
            name: item.school_name,
          }
        })
      }
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
  getRoleListByCode: state => listCode => {
    let data = []
    state.userListRoles.forEach((item) => {
      if (listCode.includes(item.code)) {
        data.push((item.id))
      }
    })

    return data
  }

}

export default getters
