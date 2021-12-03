const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('/api1', {
			//遇见 /api1前缀的请求，就会触发该代理配置。
			target: 'http://localhost:5000', // 请求转发给谁。
			changeOrigin: true, // 默认是false，控制服务器收到的请求头（header）中【Host】字段的值。加上此代码更为严谨。
			pathRewrite: { '^/api1': '' } //重写请求路径【必须要写】。
		}),
		proxy('/api2', {
			target: 'http://localhost:5001',
			changeOrigin: true,
			pathRewrite: { '^/api2': '' }
		})
	);
};
