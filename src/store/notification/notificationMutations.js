const mutations = {
  SET_LIST_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications;
  },
  UPDATE_NOTIFICATION(state, notification){
    state.notification = notification;
  },
  ADD_NOTIFICATION (state, notification) {
    state.notifications.unshift(notification)
  },
  SET_TOTAL_PAGES(state, totalPages){
    state.totalPages = totalPages
  }
}

export default mutations
