const getters = {
  getClasses: state => {
    return state.listClasses.filter(function (element) {
      return element.status !== 0;
    });
  },

  getOptions: state =>{
    let response = []
    if(state.listClasses.length > 0){
      response.push({
        name: "Tất cả",
        id: -1
      })
    }
    state.listClasses.forEach(item => {
      response.push({
        name: item.name,
        id: item.id
      })
    })
    return response;
  },
  // getClasses: state => classStatus => state.listClasses.find((item) => item.status === classStatus),
  getClassById: state => classId => state.listClasses.find((item) => item.id === classId)
}

export default getters
