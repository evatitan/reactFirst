/**
 * 本文件专门用于暴露一个store对象，整个应用只有一个store对象 
 * */

// 引入createStore库，专门用于创建热镀锌中最为核心的store对象
import { createStore } from 'redux';
// 引入为Count组件服务的reducer，默认暴露（只暴露一个东西）
import countReducer from './count_redux';
//接住创建的store对象,且对外暴露
const store = createStore(countReducer);
export default store;
