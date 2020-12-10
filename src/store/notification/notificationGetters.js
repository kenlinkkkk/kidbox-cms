const getters = {
  getNotifications: state =>{
    return state.notifications;
  },
  getNotification: state => notificationId => state.notifications.find((p) => p.id === notificationId),
  getTotalPages: state =>{
    return state.totalPages;
  },
}

export default getters
