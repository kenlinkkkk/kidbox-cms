const getters = {
  getListInfrastructureType: state => {
    return state.infrastructureTypes
  },
  getListInfrastructure: state => {
    return state.infrastructures
  },
  getDetailInfrastructure: state => infrastructureId => state.infrastructures.find((item) => item.id === infrastructureId),
  getDetailInfrastructureType: state => typeId => state.infrastructureTypes.find((item) => item.id === typeId)
}

export default getters
