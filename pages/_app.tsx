import React from 'react'
import type { AppProps } from 'next/app'

import { AuthProvider } from 'packages/auth'

import 'styles/globals.scss'

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
