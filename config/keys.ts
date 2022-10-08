import devConfig from "./dev"
import prodConfig from "./prod"

interface ApplicationConfig {
  BACKEND_URI: string
  SECRET: string
}

let config: ApplicationConfig
if (process.env.NODE_ENV == "production") {
  config = prodConfig
} else {
  config = devConfig
}

export default config
