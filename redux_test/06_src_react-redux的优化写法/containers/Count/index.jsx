import React, { Component } from 'react';
//注意： 容器组件使用store需要通过上一层组件中（APP）props的方式引入，而非常规引入方式。
// import store from '../../redux/store';
//引入connect用于链接UI组件和redux
import { connect } from 'react-redux';
// 引入action
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action';
//connect是一个函数，且调用之后的返回值也是一个函数。

// 定义UI组件
class Count extends Component {
	increment = () => {
		const { value } = this.selectionNumber;
		this.props.jia(value * 1);
	};

	decrement = () => {
		const { value } = this.selectionNumber;
		this.props.jian(value * 1);
	};

	sumOdd = () => {
		const { value } = this.selectionNumber;
		if (this.props.count % 2 !== 0) {
			this.props.jia(value * 1);
		}
	};

	sumAsync = () => {
		const { value } = this.selectionNumber;
		this.props.jiaAsync(value * 1, 5000);
	};

	render() {
		console.log('UI recive', this.props);
		return (
			<div>
				<h1>sum:{this.props.count}</h1>
				<select
					ref={(c) => {
						this.selectionNumber = c;
					}}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}> + </button>&nbsp;
				<button onClick={this.decrement}> - </button>&nbsp;
				<button onClick={this.sumOdd}> + when sum is odd</button>&nbsp;
				<button onClick={this.sumAsync}> sum async </button>&nbsp;
			</div>
		);
	}
}

// 使用connect创建并暴露一个CountUI的容器组件
export default connect(
	(state) => ({ count: state }), // mapStateToProps()
	// mapDispatchToProps 的API层级的优化写法： 只要函数的调用结果是一个action对象，react-redux的就会进行自动 dispatch action到 reducer进行操作。
	// 此函数可以传送2类值：1. 函数（一般写法）  2.对象（优化写法）
	{
		jia: createIncrementAction,
		jian: createDecrementAction,
		jiaAsync: createIncrementAsyncAction
	}

	// mapDispatchToProps() 的一般写法
	// (dispatch) => {
	// 	return {
	// 		jia: (num) => dispatch(createIncrementAction(num)),
	// 		jian: (num) => dispatch(createDecrementAction(num)),
	// 		jiaAsync: (num, time) => dispatch(createDecrementAsyncAction(num, time))
	// 	};
	// }
)(Count);
