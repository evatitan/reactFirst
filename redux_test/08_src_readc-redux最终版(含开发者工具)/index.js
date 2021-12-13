import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

// 此处需要用 provider 包裹App, 目的是让App所有后代容器组件都能接受到store
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
