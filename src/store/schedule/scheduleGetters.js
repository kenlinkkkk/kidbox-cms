const getters = {
  getScheduleByDate: state => datePicked => state.schedules.find((item) =>
    item.date.split('T')[0] === datePicked.toISOString().split('T')[0]
  ),
  getSchedule: state => {
    state.schedules
  }
}

export default getters
