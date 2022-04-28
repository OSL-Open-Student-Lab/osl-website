/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { BaseProps } from 'packages/customTypes'
import { createContext, useContext, useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import { api } from 'packages/api'

interface AuthData {
  logged: boolean
  username: string
}
interface AuthContextValue {
  signOut: () => Promise<void>
  signIn: (
    username: string,
    password: string,
    rememberme: boolean
  ) => Promise<void>
  signUp: (
    email: string,
    username: string,
    password1: string,
    password2: string
  ) => Promise<void>
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

export function AuthProvider({ children }: BaseProps): JSX.Element {
  const router = useRouter()
  async function authChecker(): Promise<AuthData> {
    try {
      const response = await api.get('/auth/current')
      return {
        logged: response.status === 200 && response.statusText === 'OK',
        username: response.data.username
      }
    } catch (e) {
      return {
        logged: false,
        username: ''
      }
    }
  }
  const { data: authData } = useSWR('AUTH_CHECK', authChecker, {})
  const { mutate } = useSWRConfig()
  useEffect(() => {
    const allowedPaths = [/\/auth.+?/, /\/facilities$/, /\/$/]
    const shouldRedirect = !allowedPaths.reduce(
      (acc: boolean, item: RegExp): boolean => {
        if (acc) {
          return acc
        }
        return item.test(router.pathname)
      },
      false
    )
    if (!authData?.logged && shouldRedirect) {
      router.push('/')
    }
  }, [authData, router.pathname])
  useEffect(() => {
    const allowedPaths = [/\/auth.+?/]
    const shouldRedirect = allowedPaths.reduce(
      (acc: boolean, item: RegExp): boolean => {
        if (acc) {
          return acc
        }
        return item.test(router.pathname)
      },
      false
    )
    if (authData?.logged && shouldRedirect) {
      router.push('/')
    }
  }, [authData, router.pathname])

  const contextValue = {
    signOut: async function signOut() {
      try {
        await api.get('/auth/logout')
        mutate('AUTH_CHECK', {}, { revalidate: true })
      } catch (e) {
        console.error(e)
      }
    },
    signIn: async function signIn(
      username: string,
      password: string,
      rememberme: boolean
    ) {
      try {
        await api.post('/auth/login', {
          username,
          password,
          rememberme
        })
        mutate('AUTH_CHECK').then(() => router.push('/'))
      } catch (e) {
        console.log(e)
      }
    },
    signUp: async function signUp(
      email: string,
      username: string,
      password1: string,
      password2: string
    ) {
      try {
        await api.post('/auth/registration', {
          email,
          username,
          password1,
          password2
        })
        mutate('AUTH_CHECK')
      } catch (e) {
        console.error(e)
      }
    }
  }
  return (
    <AuthContext.Provider value={{ ...contextValue, authData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
