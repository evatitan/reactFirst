// 用于汇总所有的reducer

import { combineReducers } from 'redux';
// 引入为Count组件和Person组件服务的reducer
import count from './count';
// 引入为Person组件和Person组件服务的reducer
import person from './person';
// 汇总reducer，形成一个总的reducers
export default combineReducers({
	sum: count,
	persons: person
});
