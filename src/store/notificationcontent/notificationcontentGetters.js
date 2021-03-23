const getters = {
  getNotificationContents: state =>{
    return state.notificationContents;
  },
  getNotificationContent: state => notificationContentId => state.notificationContents.find((p) => p.id === notificationContentId),
  getTotalPages: state =>{
    return state.totalPages;
  },
}

export default getters
