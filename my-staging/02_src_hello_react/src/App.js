// 创建“外壳”组件App，涵盖所有其他的小组件
// 以下写法表示： 暴露react文件，且在react中使用了多种暴露方式。
import React, { Component } from 'react';
import Hello from './components/Hello';
import Welcome from './components/Welcome';

//创建并直接暴露App组件
export default class App extends Component {
	render() {
		return (
			<div>
				<Hello />
				<Welcome />
			</div>
		);
	}
}
