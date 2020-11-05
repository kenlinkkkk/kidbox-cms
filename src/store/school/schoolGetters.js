const getters = {
  getSchools: state => {
    return state.schools;
  },
  getSchool: state => schoolId => state.schools.find((school) => school.id === schoolId)
}

export default getters
