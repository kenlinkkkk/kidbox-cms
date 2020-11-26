const getters = {
  getMenu: state => {
    return state.menuWeek;
  },
  getMenuInDate: state => datePicked => state.menuWeek.find((item) => item.date === datePicked.toISOString().split('T')[0])
}

export default getters
