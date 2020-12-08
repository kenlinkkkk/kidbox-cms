const getters = {
  getAllWeekSchedules: state => {
    state.schedules
  },
  getScheduleByDate: state => datePicked => state.schedules.find((item) =>
    item.date.split('T')[0] === datePicked.toISOString().split('T')[0]
  )
}

export default getters
