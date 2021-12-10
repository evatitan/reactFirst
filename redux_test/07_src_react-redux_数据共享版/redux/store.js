/**该文件专门用于暴露一个store 对象，整个应用只有一个store对象*/

// 引入createSTore专门创建redux中最为核心的store对象
// 引入combineReducer 规范存贮不同组件的信息。
import { createStore, applyMiddleware, combineReducers } from 'redux';

// 引入为Count组件和Person组件服务的reducer
import countReducer from './reducers/count';
import personReducer from './reducers/person';

//引入redux-thunk，用于支持异步action，分别暴露和统一暴露需要{thunk},如果是默认暴露，那就直接写thunk
import thunk from 'redux-thunk';

// combineReducecrs函数被调用的时候所传入的对象，就是后面redux所存储的总对象。
// 汇总reducer，形成一个总的reducers
const allReducer = combineReducers({
	sum: countReducer,
	persons: personReducer
});

// applyMiddleware是一个函数，在这里需要做第二个参数，且需要传入thunk。
const store = createStore(allReducer, applyMiddleware(thunk));

export default store;
