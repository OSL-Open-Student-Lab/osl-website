/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { BaseProps } from 'packages/customTypes'
import { createContext, useContext, useState } from 'react'
import useSWR from 'swr'

import { api } from 'packages/api'
import { useDidMountEffect } from 'packages/hooks/useDidMountEffect'
import { useLocalStorage } from 'packages/hooks/useLocalStorage'

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
  signUp: (email: string, username: string, password: string) => Promise<void>
  authData?: AuthData
  username?: string
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
  async function authChecker(authUrl: string): Promise<AuthData> {
    try {
      const response = await api.get(authUrl)
      return {
        logged: response.status === 200 && response.statusText === 'OK',
        username: response.data.data.username
      }
    } catch (e) {
      return {
        logged: false,
        username: ''
      }
    }
  }

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
    }
  }, [authData, error])

  const contextValue = {
    signOut: async function signOut() {
      try {
        const response = await api.get(process.env.signOutPath!).then((res) => {
          router.push('/')
          return res
        })
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
        const response = await api
          .post(process.env.signInPath!, {
            username,
            password,
            rememberme
          })
          .then((res) => {
            return res
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
          api.post('/auth/email_exists', { email })
        ])
        const response = await api
          .post(process.env.signUpPath!, {
            email,
            username,
            password
          })
          .then((res) => {
            return res
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
  }
  return (
    <AuthContext.Provider value={{ ...contextValue, authData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
