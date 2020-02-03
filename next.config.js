const { parsed: localEnv } = require("dotenv").config()
const webpack = require("webpack")

module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    // eslint-disable-next-line no-unused-vars

    webpack(config, options) {
      config.module.rules.push({
        type: "javascript/auto",
        test: /\.mjs$/,
        use: []
      })

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options)
      }
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
      return config
    }
  })
