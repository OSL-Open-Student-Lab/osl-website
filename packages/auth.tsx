/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { BaseProps } from 'packages/customTypes'
import { createContext, useContext, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import { api } from 'packages/api'
import { useDidMountEffect } from './hooks/useDidMountEffect'

interface AuthData {
  logged: boolean
  message?: string
}
interface AuthContextValue {
  signOut: () => Promise<void>

  signIn: (
    username: string,
    password: string,
    rememberme: boolean
  ) => Promise<void>
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

async function authChecker(authUrl: string): Promise<AuthData> {
  try {
    const response = await api.get(authUrl)
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
  } = useSWR(process.env.authCheckPath, authChecker, {})

  useDidMountEffect(() => {
    if (router.pathname.match(/\/auth\//)) {
      if (authData?.logged && !error) {
        router.push('/')
      }
    } else if (!authData?.logged || error) {
      router.push('/')
    }
  }, [authData, error])

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      authData,
      signOut: async function signOut() {
        try {
          const response = await api.get(process.env.signOutPath)
          mutate(
            { logged: false, message: response.data?.message },
            { revalidate: true }
          )
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
          const response = await api.post(process.env.signInPath, {
            username,
            password,
            rememberme
          })
          mutate(
            {
              logged: response.status === 200 && response.statusText === 'OK'
            },
            { revalidate: true }
          )
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
          const response = await api.post(process.env.signUpRoute, {
            email,
            username,
            password
          })
          mutate(
            {
              logged: response.status === 200 && response.statusText === 'OK'
            },
            { revalidate: true }
          )
        } catch (e) {
          console.error(e)
        }
      }
    }),
    [authData]
  )
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
