const getters = {
  getNotificationTypes: state =>{
    return state.notificationTypes;
  },
  getNotificationType: state => notificationTypeId => state.notificationTypes.find((p) => p.id === notificationTypeId),
  getTotalPages: state =>{
    return state.totalPages;
  },
}

export default getters
