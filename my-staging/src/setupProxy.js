/**【配置多个服务器代理】 ————见【react脚手架配置代理.md】文件。
 * 1. 此文件名不可改，否则react脚手架无法找到。
 * 2. 不可以使用ES6语法书写，需要使用 CJS。 此文件不是给前端代码执行，而是react脚手架找到此文件后，将其加入webpack的配置中，webpack中使用的都是node语法（CJS语法）。
 * 3. 一旦修改此文件，需要重启脚手架。
 * 4. 可以直接粘贴以便之后使用。
 */
//引入一个内置模块，这库已经存在。
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('/api1', {
			//遇见 /api1前缀的请求，就会触发该代理配置。
			target: 'http://localhost:5000', // 请求转发给谁。
			changeOrigin: true, // 默认是false，控制服务器收到的请求头（header）中【Host】字段的值。加上此代码更为严谨。
			pathRewrite: { '^/api1': '' } //重写请求路径【必须要写】。
		})
	);
};

// const proxy = require('http-constproxy-middleware');

// module.export = function(app) {
// 	app.use(
// 		proxy('/api1', {
// 			target: 'http://localhost:5000',
// 			changeOrigin: true,
// 			pathRewrite: { '^/api': '' }
// 		})
// 	);
// };
