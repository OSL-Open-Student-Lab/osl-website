import axios from 'axios'

export function signOut() {
  axios.get('http://localhost:5000/api/v1/auth/logout', {
    withCredentials: true
  })
}
