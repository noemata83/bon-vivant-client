const { parsed: localEnv } = require("dotenv").config()
const webpack = require("webpack")

/**
 * @type (import('next').NextConfig)
 */
const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      type: "javascript/auto",
      test: /\.mjs$/,
      use: [],
    })

    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  },
}

module.exports = nextConfig
