import React, { PureComponent } from 'react';
import './index.css';

export default class Parent extends PureComponent {
	state = { carName: 'c36' };

	changeCar = () => {
		//this.setState({});
		this.setState((carName) => ({
			carName: 'mbh'
		}));
	};

	// 如果使用一般的component，则需要手动控制阀门，进行对比之后渲染。但是一般开发中，使用PureComponent 自主后台控制了阀门。
	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log(this.props, this.state); // 目前的props和state
	// 	console.log(nextProps, nextState); // 接下来要变化的目标props， 目标state
	// 	// return  !nextState.carName === this.state.carName
	// 	if (nextState.carName === this.state.carName) return false;
	// 	else return true;
	// }

	render() {
		console.log('parent-----render');
		const { carName } = this.state;
		return (
			<div className="parent">
				<h3>component Parent</h3>
				<span>my Car is {carName}</span>
				<br />
				<button onClick={this.changeCar}>change Car</button>
				<Child carName="at" />
				{/* <Child carName={carName} /> */}
			</div>
		);
	}
}

class Child extends PureComponent {
	// 如果使用一般的component，则需要手动控制阀门，进行对比之后渲染。但是一般开发中，使用PureComponent 自主后台控制了阀门。
	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log(this.props, this.state);
	// 	console.log(nextProps, nextState);
	// 	return !this.props.carName === nextProps.carName;
	// }

	render() {
		console.log('child-----render');
		return (
			<div className="child">
				<h3>component Child</h3>
				<span>Revice the car is {this.props.carName}</span>
			</div>
		);
	}
}
