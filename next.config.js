const { env } = require('process')

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd ? '/Korea-UV-Repeater-Map/' : '',
}
