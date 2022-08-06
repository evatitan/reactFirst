import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

export default class App extends Component {
	state = {
		todos: [
			{ id: '001', name: 'eat', done: true },
			{ id: '002', name: 'sleep', done: true },
			{ id: '003', name: 'coding', done: false },
			{ id: '004', name: 'shopping', done: false }
		]
	};

	addTodo = (todoObj) => {
		const { todos } = this.state;
		const newTodo = [ todoObj, ...todos ];
		this.setState({ newTodo });
	};

	render() {
		return (
			<Fragment>
				<Header addTodo={this.addTodo} />
				<List />
				<Footer />
			</Fragment>
		);
	}
}
