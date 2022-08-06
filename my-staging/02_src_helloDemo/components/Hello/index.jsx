/**
 * 如果不同组件中的css标签名不重名，则可以直接简单引入css。
 * 1. import './index.css';
 * 2. 【借助less工具】在css文件中，组件名字标签包裹所有其他样式标签即可。
 * 3.【样式的模块化】在css文件名加入module，这里引入方式调成以下：将 hello 的 css 引入并自动存入styles对象中。这样不会和其他组件的css名称发生冲突。也叫做【样式的模块化】。
 * */
import React, { Component } from 'react';
import styles from './index.module.css';
export default class Hello extends Component {
	render() {
		return <h2 className={styles.title}>Hello !</h2>;
	}
}
