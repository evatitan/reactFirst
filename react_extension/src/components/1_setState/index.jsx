// 2.setState使用原则【见README】：
// (1).如果新状态不依赖于原状态 ===> 使用对象方式  setState(stateChange, [callback])------对象式的setState
// (2).如果新状态依赖于原状态 ===> 使用函数方式    setState(updater, [callback])------函数式的setState
// (3).如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取

import React from 'react';

export default class Demo extends React.Component {
	state = { count: 0 };

	add = () => {
		// 【对象式的setSate】
		const { count } = this.state;
		this.setState({ count: count + 1 }, () => {
			console.log(this.state.count); // 此处的输出为1,此callback在状态更新完毕，界面也更新后（render调用后）才被调用。
		});
		// console.log(count);  // 此处的输出为0, 因为setState是同步方法，但是setState引起react后期更新状态动作是异步的。

		// 函数式的setSate】
		// this.setState((state) => ({count:state+1}));  // 可以接收到state
		this.setState((state, props) => {
			console.log(state, props);
			return { count: state.count + 1 };
		});
	};

	render() {
		return (
			<div>
				<h1>Sum is = {this.state.count}</h1>
				<button onClick={this.add}>+1</button>
			</div>
		);
	}
}
