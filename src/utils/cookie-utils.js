import Cookies from 'js-cookie'

export default {
  getToken() {
    return Cookies.get('Authorization') || ''
  },
  setToken(token) {
    Cookies.set('Authorization', token)
  },
}
