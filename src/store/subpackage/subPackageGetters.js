const getters = {
  getPackages: state =>{
    return state.packages;
  },
  getPackage: state => packageId => state.packages.find((p) => p.id === packageId),
  getTotalPages: state =>{
    return state.totalPages;
  },
}

export default getters
