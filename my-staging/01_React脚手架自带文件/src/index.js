// 入口文件用于引入react核心库，重要！！！
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//引入app文件，app文件中本身没有渲染
import App from './App';
//用于记录页面上的性能情况。
import reportWebVitals from './reportWebVitals';
//在此渲染app， <React.StrictMode>用于检查app及其子组件内的书写是否都合理。
ReactDOM.render(<React.StrictMode><App/></React.StrictMode>,document.getElementById('root'));
//用于记录页面上的性能情况，借助web-itals进行相关配置。
reportWebVitals();
