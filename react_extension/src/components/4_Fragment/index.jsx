// Fragement 在react编译的时候，会被丢弃，不影响DOM，可以携带一个 key 的属性
// 另一种类似的方式 是空标签，但是不能携带属性。
import React, { Fragment } from 'react';

export default class index extends React.Component {
	render() {
		return (
			<Fragment key={1}>
				<input type="text" />
				<h2>fragment</h2>
			</Fragment>

			// <>
			//    <h3>tag</h3>
			// </>
		);
	}
}
