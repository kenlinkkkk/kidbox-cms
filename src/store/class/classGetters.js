const getters = {
  getClasses: state => {
    return state.listClasses;
  },
  getClassById: state => classId => state.listClasses.find((item) => item.id === classId)
}

export default getters
