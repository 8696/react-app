const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use('/api/**', createProxyMiddleware({
    target: 'http://proxy.info.icode.link/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }))
}
