import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';
import './App.css'

export default class App extends Component {
	
    // 状态在哪里-操作状态的方法就在哪里
	state={todos:[
		{id:'001',name:"吃饭",done:true},
		{id:'002',name:"睡觉",done:true},
		{id:'003',name:"敲代码",done:false},
		{id:'004',name:"逛街",done:false},
	]}
    
	// addTodo 用于添加一个todo， 接受的参数是todo对象
	addTodo=(todoObj)=>{
		// 获取原来的todos
		const {todos}=this.state
		// 追加一个todo
		const newTodos = [todoObj,...todos]
		//更新状态
		this.setState({todos:newTodos})
	}

	//updateTodo用于更新一个todo对象
	updateTodo=(id,done)=>{
        //获取状态中的todos
	    const {todos}=this.state
	    //匹配处理数据
	    const newTodos = todos.map((todoObj)=>{
	    	if(todoObj.id === id) return {...todoObj,done:done}
	    	else return todoObj
	    })
	    //更新数据
	    this.setState({todos:newTodos})
	}


	render() {
		const {todos} = this.state
		return (
			<div className="todo-container">
			<div className="todo-wrap">
				<Header addTodo={this.addTodo}/>
				<List todos={todos} updateTodo={this.updateTodo}/> {/**父组件【App】给子组件【List】传递数据 */}
				<Footer/>
			</div>
		  </div>
		)
	}
}
