/** @type {import('next').NextConfig} */
const withPWA=require('next-pwa')
const runtimeCaching=require('next-pwa/cache')

const nextConfig = {
  reactStrictMode: true,
  env: {
    signUpPath:'/auth/register',
    signInPath: 'auth/login',
    signOutPath:'/auth/logout',
    authCheckPath: '/auth/current',
    checkEmailPath: '/auth/email_exists',
    checkUsernamePath:'/auth/username_exists',
    apiBasePath:process.env.NODE_ENV==='production'? 'http://localhost:5000/api/v1/' : '/api'
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
    fallbacks:{image:'/favicon.svg'},
  },
  distDir: 'build',
  images: {
    disableStaticImages:true
  }
}

module.exports = withPWA(nextConfig)
