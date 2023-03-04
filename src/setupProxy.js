const { createProxyMiddleware } = require('http-proxy-middleware');

const { REACT_APP_IGDB_API_URL, REACT_APP_IGDB_API_PROXY } = process.env;

module.exports = function (app) {
  const headers = {};
  app.use(
    createProxyMiddleware(REACT_APP_IGDB_API_PROXY, {
      target: REACT_APP_IGDB_API_URL,
      changeOrigin: true,
      secure: false,
      headers: headers,
      pathRewrite: {
        [`^${REACT_APP_IGDB_API_PROXY}`]: '',
      },
    })
  );
}
