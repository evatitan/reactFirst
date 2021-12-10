import React from 'react';
import { connect } from 'react-redux';
import { createDecrementAction, createIncrementAction, createIncrementAsyncAction } from '../../redux//actions/count';
class Count extends React.Component {
	handleAdd = () => {
		this.props.add(1);
	};
	handleReste = () => {
		this.props.reset(1);
	};
	handleAddOdd = () => {
		if (this.props.sum % 2 !== 0) {
			this.props.add(1);
		}
	};
	handleAddAsync = () => {
		this.props.addAsync(1, 3000);
	};
	render() {
		return (
			<div>
				<h2>Count Component, , there are {this.props.persons} person</h2>
				<h4>Sum is : {this.props.sum}</h4>
				<button onClick={this.handleAdd}>+1</button>
				<button onClick={this.handleReste}>-1</button>
				<button onClick={this.handleAddOdd}>Odd +1</button>
				<button onClick={this.handleAddAsync}>async +1</button>
			</div>
		);
	}
}

export default connect(
	//
	(state) => ({
		sum: state.sum,
		persons: state.persons.length
	}),
	{
		add: createIncrementAction,
		reset: createDecrementAction,
		addAsync: createIncrementAsyncAction
	}
)(Count);
