import React from 'react';
import ReactDOM from 'react-dom';
// 引入BrowserRouter 路由器， 对所有子组件的路由进行包裹。
import { BrowserRouter } from 'react-router-dom';
//import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
