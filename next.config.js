const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  env: {
    REACT_APP_BACKEND: process.env.REACT_APP_BACKEND,
  },
})
