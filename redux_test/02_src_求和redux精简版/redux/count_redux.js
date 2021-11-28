/**
 * 1. 该文件用于创建一个为Count组件服务的reducer，reducer的本质是一个函数。
 * 2. reducer 函数会接到2个参数：之前的状态（preState），动作:(action).
 * 3. reducer 只负责维护状态，但是并不会调用render修改DOM。
 */

// 推荐写法，初始化状态为行参默认值initState，提高代码可读性
const initState = 0;

export default function countReducer(preState = initState, action) {
	//console.log(preState, action);
	//从 actio对象中获取：
	const { type, data } = action;
	// 根据type决定如何加工数据
	switch (type) {
		case 'increment':
			return preState + data;
		case 'decrement':
			return preState - data;
		//初始化状态
		default:
			return preState;
	}
}
