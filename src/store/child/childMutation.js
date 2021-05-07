const mutations = {
  SET_LIST_CHILD (state, data) {
    state.childList = []
    if (data) {
      data.forEach((item) => {
        state.childList.push(item)
      })
    }
  },

  SET_PAGINATE_INFO (state, data) {
    if (data) {
      state.paginate = {
        page: state.paginate.page + 1,
        totalPages: data
      }
    }
  },
  SET_CHILD_INFO (state, data) {
    if (data) {
      state.childDetail = data
    }
  },
  SET_HEALTH_DATA (state, data) {
    state.healthNew = {
      weight: data.new_heath.weight[0],
      height: data.new_heath.height[0]
    }

    let detail = data.statistics
    let weight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let height = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    detail.forEach((item) => {
      if (item.type === 1) {
        weight[Number.parseInt(item.months) - 1] = item.data
      } else if (item.type === 2) {
        height[Number.parseInt(item.months) - 1] = item.data
      }
    })
    state.healthStatistics.weight = {
      name: 'Cân nặng (kg)',
      data: weight
    }

    state.healthStatistics.height = {
      name: 'Chiều cao (cm)',
      data: height
    }
  },
  SET_LIST_ACHIEVEMENT (state, data) {
    state.achievement.list = []
    state.achievement.totalPoint = data.total_point.point__sum
    let listAchievement = data.achievements.data
    listAchievement.forEach((item) => {
      state.achievement.list.push(item)
    })
  }
}

export default mutations
