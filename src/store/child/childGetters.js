const getters = {
  getListChild: state => {
    return state.childList
  },
  getPaginate: state => {
    return state.paginate
  },
  getChildInfo: state => {
    return state.childDetail
  },
  getHeightArr: state => {
    return state.healthStatistics.height
  },
  getWeightArr: state => {
    return state.healthStatistics.weight
  },
  getPhysical: state => {
    return state.healthNew
  },
  getListAchievement: state => {
    return state.achievement.list
  },
  getTotalPoint: state => {
    return state.achievement.totalPoint
  }
}

export default getters
