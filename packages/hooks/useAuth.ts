import useSWR from 'swr'
import { useEffect } from 'react'
import axios from 'axios'

export function useAuth(onSuccess?: () => void, onReject?: () => void): void {
  const { data, error } = useSWR(
    process.env.apiAuthRoute,
    async (authUrl: string) => {
      const response = await axios.get(authUrl, { withCredentials: true })
      return response.status
    }
  )
  useEffect(() => {
    if (data === 200 && !error) {
      onSuccess && onSuccess()
    } else {
      onReject && onReject()
    }
  }, [data, error])
}
