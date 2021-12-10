// 初始化人的列表
import { ADD_PERSON } from '../constant';
const initState = [];
export default function personReducer(preState = initState, action) {
	const { type, data } = action;
	switch (type) {
		case ADD_PERSON:
			return [ data, ...preState ];

		default:
			return preState;
	}
}
