import devConfig from "./dev.mjs"
import prodConfig from "./prod.mjs"

let config
if (process.env.NODE_ENV == "production") {
  config = prodConfig
} else {
  config = devConfig
}

export default config
