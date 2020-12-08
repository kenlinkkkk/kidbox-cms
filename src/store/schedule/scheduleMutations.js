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
  }
}

export default mutations
