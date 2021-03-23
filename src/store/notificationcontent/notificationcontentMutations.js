const mutations = {
  SET_LIST_NOTIFICATION_CONTENTS(state, notificationContents) {
    state.notificationContents = notificationContents;
  },
  UPDATE_NOTIFICATION_CONTENT(state, notificationContent){
    state.notificationContent = notificationContent;
  },
  ADD_NOTIFICATION_CONTENT (state, notificationContent) {
    state.notificationContents.unshift(notificationContent)
  },
  SET_TOTAL_PAGES(state, totalPages){
    state.totalPages = totalPages
  }
}

export default mutations
