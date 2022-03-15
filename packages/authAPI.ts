import axios from 'axios'

export async function checkAuth() {
  return await axios
    .get('http://localhost:5000/api/v1/auth/current', {
      withCredentials: true
    })
    .then(() => true)
    .catch(() => false)
}
export function signOut(thenFunc: () => void) {
  axios
    .get('http://localhost:5000/api/v1/auth/logout', {
      withCredentials: true
    })
    .then(thenFunc)
    .catch(() => false)
}
