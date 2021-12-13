/**
 * 本文件专门为Count组件生成action对象
 */

import { INCREMENT, DECREMENT } from '../constant';

//同步action就是指action的值是一般对象
export const increment = (data) => ({ type: INCREMENT, data: data });
export const decrement = (data) => ({ type: DECREMENT, data: data });

// 异步action就是指action的值是一个函数， 异步action中一般都会调用同步action。
// 需要在store中引入插件 applyMiddleware， 且需要下载redux-thunk库。
// 异步action不是必须要用的，在组件本身中也可以设置异步任务。
export const incrementAsync = (data, time) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(increment(data));
		}, time);
	};
};
