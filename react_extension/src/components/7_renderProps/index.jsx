// A 和 B 通过 Parten 链接成为父子组件，如何传递数据？
// 1. 使用childrenProps方式构建父子关系，this.props.children接数据。但是如果B组件需要A组件内的数据  == 做不到
// 2. 使用renderProps构建，this.props.render()接数据。
import React, { PureComponent } from 'react';

import './index.css';

export default class Parent extends PureComponent {
	render() {
		return (
			<div className="parent">
				<h3>component Parent</h3>
				{/* 和myNavLink类似，所传递的数据藏在了this.props.children上面 ,如果需要使用，则需要调用。*/}
				{/* <A><B /></A> */}
				<A render={(name) => <B name={name} />} />
			</div>
		);
	}
}

class A extends PureComponent {
	state = { name: 'tom' };
	render() {
		console.log(this.props);
		const { name } = this.state;
		return (
			<div className="a">
				<h3>component A</h3>
				{/* 调用前面的标签体内容 */}
				{/* {this.props.children} */}
				{/* 此方法更为灵活，预先留出空白，以便编码的时候再决定不同组件之间的关系，进行传递数据 */}
				{this.props.render(name)}
			</div>
		);
	}
}

class B extends PureComponent {
	render() {
		console.log('render-----B');
		return (
			<div className="b">
				<h3>component B</h3>
				<h2>Name from A is: {this.props.name}</h2>
			</div>
		);
	}
}
