import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';

ReactDOM.render(<App />, document.getElementById('root'));

// 引入store， 如果状态有所改变，在本文件中直接对整个APP组件进行监听+调用render。 不必在子组件中进行监听，且diffing算法，不会导致工作量巨大。
store.subscribe(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
});
