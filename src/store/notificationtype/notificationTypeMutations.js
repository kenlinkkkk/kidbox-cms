const mutations = {
  SET_LIST_NOTIFICATIONTYPES(state, notificationTypes) {
    state.notificationTypes = notificationTypes;
  },
  UPDATE_NOTIFICATIONTYPE(state, notificationType){
    state.notificationType = notificationType;
  },
  ADD_NOTIFICATIONTYPE (state, notificationType) {
    state.notificationTypes.unshift(notificationType)
  },
  SET_TOTAL_PAGES(state, totalPages){
    state.totalPages = totalPages
  }
}

export default mutations
