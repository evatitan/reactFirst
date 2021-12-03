import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';

ReactDOM.render(<App />, document.getElementById('root'));

// 引入 store 监测 redux 中状态的改变，如redux的状态发生改变，则重新渲染父组件，引起子组件也重新渲染获得最新数据。
// 优点：1.不用子组件单独监测。   2. Diffing 算法不会有太多工作量。
store.subscribe(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
});
