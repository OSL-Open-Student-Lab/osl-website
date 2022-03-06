/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPWA=require('next-pwa')
const runtimeCaching=require('next-pwa/cache')

const nextConfig = {
  reactStrictMode: true,
  env: {
    apiAuthRoute:'/api/auth'
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
    fallbacks:{image:'/favicon.ico'}
  },
  distDir: 'build',
  images: {
    disableStaticImages:true
  }
}

module.exports = withPWA(nextConfig)
