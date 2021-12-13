import React, { Component } from 'react';
// 此处引入的是Count的容器组件，非UI组件
import Count from './containers/Count';
// 此处引入的是Person的容器组件，非UI组件
import Person from './containers/Person';

export default class App extends Component {
	render() {
		return (
			<div>
				<Count />
				<hr />
				<Person />
			</div>
		);
	}
}
