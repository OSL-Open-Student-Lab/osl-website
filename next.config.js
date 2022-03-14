/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPWA=require('next-pwa')
const runtimeCaching=require('next-pwa/cache')

const nextConfig = {
  reactStrictMode: true,
  env: {
    apiLoginRoute: 'http://localhost:5000/api/v1/auth/login',
    apiAuthRoute: 'http://localhost:5000/api/v1/auth/current',
    apiRegRoute: 'http://localhost:5000/api/v1/auth/register',
    apiUsernameCheckRoute: 'http://localhost:5000/api/v1/auth/username_exists',
    apiEmailCheckRoute: 'http://localhost:5000/api/v1/auth/email_exists',
    
  },
  i18n: {
    locales:['ru','en'],
    defaultLocale: 'ru',
    localeDetection: true
  },
  pwa: {
    dest: 'public',
    skipWaiting: true,
    register:true,
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    fallbacks:{image:'/favicon.ico'},
  },
  distDir: 'build',
  images: {
    disableStaticImages:true
  }
}

module.exports = withPWA(nextConfig)
// module.exports = nextConfig
