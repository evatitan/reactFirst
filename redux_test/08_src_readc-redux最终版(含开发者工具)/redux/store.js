/**该文件专门用于暴露一个store 对象，整个应用只有一个store对象*/
// 引入汇总后的reducers
import allReducer from './reducers/index';

// 引入createSTore专门创建redux中最为核心的store对象
// 引入combineReducer 规范存贮不同组件的信息。
import { createStore, applyMiddleware } from 'redux';

// 引入redux-thunk，用于支持异步action，分别暴露和统一暴露需要{thunk},如果是默认暴露，那就直接写thunk
import thunk from 'redux-thunk';

// 引入react-redux开发者工具
import { composeWithDevTools } from 'redux-devtools-extension';

// applyMiddleware是一个函数，在这里需要做第二个参数，且需要传入thunk。
const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
