const getters = {
  getRoles: state => {
    return state.userListRoles
  },
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
