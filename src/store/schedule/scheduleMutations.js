const mutations = {
  SET_WEEK_SCHEDULES(state, data) {
    data.forEach(function (item) {
      let schedule = {
        date: '',
        process: '',
        schedule: []
      }

      schedule.date = item.date
      schedule.process = item.process
      item.schedule_morning.forEach(function (scheduleItem) {
        schedule.schedule.push(scheduleItem)
      })
      item.schedule_afternoon.forEach(function (scheduleItem) {
        schedule.schedule.push(scheduleItem)
      })
      state.schedules.push(schedule)
    })
  },
  SET_SCHEDULE_BY_DATE(state, data) {
    data.schedule_morning.forEach((item) => {
      state.schedules.push(item)
    })

    data.schedule_afternoon.forEach((item) => {
      state.schedules.push(item)
    })
  }
}

export default mutations
