const getters = {
  getClasses: state => {
    return state.listClasses.filter(function (element) {
      return element.status !== 0;
    });
  },
  // getClasses: state => classStatus => state.listClasses.find((item) => item.status === classStatus),
  getClassById: state => classId => state.listClasses.find((item) => item.id === classId)
}

export default getters
