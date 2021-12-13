import React from 'react';

export default class Child extends React.Component {
	state = {
		users: [
			{ id: '001', name: 'Tom', age: 18 },
			{ id: '002', name: 'Eva', age: 25 },
			{ id: '003', name: 'Emma', age: 28 }
		]
	};
	// state = {
	// 	users: 'abc'
	// };
	render() {
		const { users } = this.state;
		return (
			<div>
				<h2>Component Child</h2>
				{users.map((userObj) => {
					return (
						<h4 key={userObj.id}>
							{userObj.name}---{userObj.age}
						</h4>
					);
				})}
			</div>
		);
	}
}
