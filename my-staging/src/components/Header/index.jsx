import React, { Component, Fragment } from 'react';
import { nanoid } from 'nanoid';

class Header extends Component {
	handleKeyUp = (event) => {
		const { keyCode, target } = event;
		console.log(keyCode, target.value);
		if (event.keyCode !== 13) return;
		if (target.value.trim() === '') {
			alert('write something');
			return;
		}
		const todoObj = {
			id: nanoid(),
			name: target.value,
			done: false
		};

		this.props.addTodo(todoObj);
		target.value = '';
	};

	render() {
		return (
			<Fragment>
				<h1>Todo List</h1>
				<input onKeyup={this.handleKeyUp} type="text" placeholder="write todo and ENTER" />
			</Fragment>
		);
	}
}

export default Header;
