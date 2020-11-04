const state = () => ({
  isAuthorization: localStorage.getItem('isAuthorization'),
  userInfo: localStorage.getItem('userInfo'),
})
export default state
