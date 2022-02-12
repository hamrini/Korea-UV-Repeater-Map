const { env } = require('process')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/Korea-UV-Repeater-Map/' : '',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
