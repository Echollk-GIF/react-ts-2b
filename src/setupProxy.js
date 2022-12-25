const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "http://127.0.0.1:4523/m1/2123391-0-default",
			changeOrigin: true,
			pathRewrite: {
				"/api": "",
			},

		})
	)
}
