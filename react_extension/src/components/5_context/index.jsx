//组件【祖-后代】之间的通行方式
import React from 'react';
import './index.css';

//  创建context容器
const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class A extends React.Component {
	state = { username: 'tom', age: 18 };

	render() {
		const { username, age } = this.state;
		return (
			<div className="parent">
				<h3> Here is Component A</h3>
				<h4>username is {this.state.username}</h4>
				{/* 引入provider方法，使用value(不可改名)给B以及其子组件传递数据 */}
				<Provider value={{ username, age }}>
					<B />
				</Provider>
			</div>
		);
	}
}

class B extends React.Component {
	// 父子之间不建议使用context，使用props直接
	render() {
		return (
			<div className="child">
				<h3> Here is Component B</h3>
				<h4>username from A is </h4>
				<C />
			</div>
		);
	}
}
// 适用于类式组件
// class C extends React.Component {
// 	// 声明自己要接收祖组件的数据
// 	static contextType = MyContext;
// 	render() {
// 		const { username, age } = this.context;
// 		return (
// 			<div className="grand">
// 				<h3> Here is Component C</h3>
// 				<h4>
// 					username from A is {username}, age is {age}
// 				</h4>
// 			</div>
// 		);
// 	}
// }

// 适用于函数和类式组件
function C() {
	return (
		<div className="grand">
			<h3> Here is Component C</h3>
			<h4>
				<Consumer>{(value) => `username from A is ${value.username}, age is ${value.age} `}</Consumer>
			</h4>
		</div>
	);
}
