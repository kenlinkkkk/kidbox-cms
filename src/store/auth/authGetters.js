const getters = {
  Authentication: state =>  {
    if (state.isAuthorization === 'true') {
      return true
    } else {
      return false
    }
  }
}

export default getters
