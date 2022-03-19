import { useRouter } from 'next/router'
import { BaseProps } from 'packages/customTypes'
import { createContext, useContext, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import { api } from 'packages/api'

interface AuthData {
  logged: boolean
  message?: string
}

interface AuthContextValue {
  signOut: () => Promise<void>
  // eslint-disable-next-line no-unused-vars
  signIn: (username: string, password: string) => Promise<void>
  // eslint-disable-next-line no-unused-vars
  signUp: (email: string, username: string, password: string) => Promise<void>
  authData?: AuthData
}

export const AuthContext = createContext<AuthContextValue>({
  async signOut() {
    return undefined
  },
  async signIn() {
    return undefined
  },
  async signUp() {
    return undefined
  }
})

async function authChecker(): Promise<AuthData> {
  try {
    const response = await api.get('/auth/current')
    return {
      logged: response.status === 200 && response.statusText === 'OK',
      message: response.data.message
    }
  } catch (e) {
    return {
      logged: false
    }
  }
}

export function AuthProvider({ children }: BaseProps): JSX.Element {
  const router = useRouter()

  const {
    data: authData,
    error,
    mutate
  } = useSWR('/auth/current', authChecker, {})

  useEffect(() => {
    if (router.pathname.match(/\/auth\//)) {
      if (authData?.logged && !error) {
        router.push('/')
      }
    }
  }, [authData, error])

  const contextValue = useMemo(
    () => ({
      authData,
      signOut: async function signOut() {
        try {
          const response = await api.get('/auth/logout')
          mutate({ logged: false, message: response.data?.message })
        } catch (e) {
          console.error(e)
        }
      },
      signIn: async function signIn(username: string, password: string) {
        try {
          const response = await api.post('/auth/login', { username, password })
          mutate({
            logged: response.status === 200 && response.statusText === 'OK'
          })
        } catch (e) {
          console.log(e)
        }
      },
      signUp: async function signUp(
        email: string,
        username: string,
        password: string
      ) {
        try {
          await Promise.all([
            api.post('/auth/username_exists', { username }),
            api.post('auth/email_exists', { email })
          ])
          const response = await api.post('/auth/register', {
            email,
            username,
            password
          })
          mutate({
            logged: response.status === 200 && response.statusText === 'OK'
          })
        } catch (e) {
          console.error(e)
        }
      }
    }),
    []
  )
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
