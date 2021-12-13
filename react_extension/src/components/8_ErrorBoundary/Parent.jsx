import React from 'react';
import Child from './Child';
export default class Parent extends React.Component {
	state = {
		hasError: '' // 用于标识子组件是否产生错误
	};

	// 当Parent的子组件出现报错的时候，会触发getDerivedStateFromError()调用，并携带错误的信息。
	static getDerivedStateFromError(error) {
		console.log(error);
		return { hasError: error };
	}
	componentDidCatch() {
		console.log('Count errors and report back to the server');
	}

	render() {
		return (
			<div>
				<h2>Component Parent</h2>
				{this.state.hasError ? <h2>The internet is bad</h2> : <Child />}
				{/* <Child /> */}
			</div>
		);
	}
}
