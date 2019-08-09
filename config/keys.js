import devConfig from './dev'
import prodConfig from './dev'

let config;
if (process.env.NODE_ENV == 'production') {
  config = devConfig;
} else {
  config = prodConfig;
}

export default config;