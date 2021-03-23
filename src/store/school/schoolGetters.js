const getters = {
  getSchools: state => {
    return state.schools;
  },
  getOptionSchools: state =>{
    let response = []
    if(state.schools.length > 0){
      response.push({
        name: "Tất cả",
        id: -1
      })
    }
    state.schools.forEach(item => {
      response.push({
        name: item.name,
        id: item.id
      })
    })
    return response;
  },
  getSchool: state => schoolId => state.schools.find((school) => school.id === schoolId)
}

export default getters
