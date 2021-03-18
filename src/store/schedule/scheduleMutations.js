const mutations = {
  SET_SCHEDULE_BY_DATE(state, data) {
    state.schedules = []
    data.schedule_morning.forEach((item) => {
      state.schedules.push(item)
    })

    data.schedule_afternoon.forEach((item) => {
      state.schedules.push(item)
    })
  }
}

export default mutations
