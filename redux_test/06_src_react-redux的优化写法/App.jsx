import React, { Component } from 'react';
// 由于CountUI组件目前已经有容器组件，所以此处应该渲染容器组件，这样UI子组件也会被渲染。
//import Count from "./components/Count"
import Count from './containers/Count';
// 容器组件使用store需要通过props的方式引入，而非常规引入方式。
import store from './redux/store';

export default class App extends Component {
	render() {
		return (
			<div>
				<Count store={store} />
			</div>
		);
	}
}
