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
  getClassById: state => classId => state.listClasses.find((item) => item.id === classId),
  getListStudents: state => {
    return  state.students
  },
  getStudentInfoById: state => studentId => state.students.find((item) => item.child.id === studentId)
}

export default getters
