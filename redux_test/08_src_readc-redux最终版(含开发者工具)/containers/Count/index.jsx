import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, incrementAsync } from '../../redux//actions/count';
class Count extends React.Component {
	handleAdd = () => {
		this.props.increment(1);
	};
	handleReste = () => {
		this.props.decrement(1);
	};
	handleAddOdd = () => {
		if (this.props.sum % 2 !== 0) {
			this.props.incrementAsync(1);
		}
	};
	handleAddAsync = () => {
		this.props.incrementAsync(1, 3000);
	};
	render() {
		return (
			<div>
				<h2>Count Component, there are {this.props.persons} person</h2>
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
		increment,
		decrement,
		incrementAsync
	}
)(Count);
