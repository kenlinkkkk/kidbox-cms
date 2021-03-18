const getters = {
  getSchedule: state => {
    return state.schedules
  },
  getScheduleById: state => scheduleId => state.schedules.find((item) => item.id === scheduleId)
}

export default getters
