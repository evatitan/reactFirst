// 初始化人的列表
import { ADD_PERSON } from '../constant';
const initState = [];
export default function personReducer(preState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case ADD_PERSON:
			//redux中的reducer【必须---纯函数】
			// 此处不能使用array.push(), 会导致preSate被改写，继而不是纯函数。
			return [ data, ...preState ];
		default:
			return preState;
	}
}
