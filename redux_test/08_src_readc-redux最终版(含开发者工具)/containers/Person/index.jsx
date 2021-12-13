import React from 'react';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { addPerson } from '../../redux/actions/person';

class Person extends React.Component {
	addPerson = () => {
		const name = this.nameNode.value;
		const age = this.ageNode.value * 1;
		const personObj = { id: nanoid(), name, age };
		this.props.addPerson(personObj);
		this.nameNode.value = '';
		this.ageNode.value = '';
	};

	render() {
		return (
			<div>
				<h2>Person Component, the sum is {this.props.sum}</h2>
				<input ref={(c) => (this.nameNode = c)} type="text" placeholder="name" />
				<input ref={(c) => (this.ageNode = c)} type="text" placeholder="age" />
				<button onClick={this.addPerson}>Add</button>
				<ul>
					{this.props.persons.map((person) => {
						return (
							<li key={person.id}>
								{person.name}-----{person.age}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		persons: state.persons,
		sum: state.sum
	}), //
	{ addPerson } //
)(Person);
