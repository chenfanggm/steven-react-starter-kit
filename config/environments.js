module.exports = {
  // --------------------------------------
  // Overrides when NODE_ENV === 'development'
  // --------------------------------------
  development: (config) => ({
    webpack: {
      ...config.webpack,
      publicPath: `http://${config.serverHost}:${config.serverPort}/`,
    },
    proxy: {
      enabled: false,
      options: {
        host: 'http://localhost:8080',
        match: /^\/api\/.*/
      }
    },
    globalVars: {
      ...config.globalVars,
      __API_URL__: `http://${config.serverHost}:${config.serverPort}/api/v1`,
    }
  }),

  // --------------------------------------
  // Overrides when NODE_ENV === 'production'
  // --------------------------------------
  production: (config) => ({
    serverHost : 'your_host_domain.com',
    proxy: {
      enabled: false,
      options: {
        host: 'http://your_host_domain.com:3000',
        match: /^\/api\/.*/
      }
    },
    cache_control: { max_age: 2 * 60 * 60 * 1000 }, // 2 hours
    globalVars: {
      ...config.globalVars,
      __API_URL__: 'http://your_host_domian.com/api/v1'
    }
  })
}

