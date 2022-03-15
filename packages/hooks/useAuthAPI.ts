import useSWR from 'swr'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function useAuth(onNotLogged?: () => void) {
  const { data, error, mutate } = useSWR(
    process.env.apiAuthRoute,
    async (authUrl: string) => {
      const response = await axios.get(authUrl, { withCredentials: true })
      return response.status === 200
    },
    { refreshInterval: 1000 }
  )
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    if (!error) return setLogged(!!data)
    if (error && !data) return onNotLogged && onNotLogged()
  }, [data, error, onNotLogged])
  return {
    logged,
    logOut: () => {
      return axios
        .get('http://localhost:5000/api/v1/auth/logout', {
          withCredentials: true
        })
        .finally(() => {
          mutate(false, true)
          onNotLogged && onNotLogged()
        })
    }
  }
}
