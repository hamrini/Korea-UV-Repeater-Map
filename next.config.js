const { env } = require('process')

const prod = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  assetPrefix: prod?'/Korea-UV-Repeater-Map/':'',
  webpack: (config, options) => {
    config.module.rules.push({
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      })

    return config
  }
}
