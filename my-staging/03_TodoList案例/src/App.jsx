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

	//删除一个todo的回调
	deleteTodo=(id)=>{
		//获取原来的todo
		const {todos}=this.state
		//删除指定id的todo对象
		const newTodos = todos.filter((todoObj)=>{
			return todoObj.id !== id
		})
		//更新状态
		this.setState({todos:newTodos})
	}

    //checkAlltodo 用于全选
	checkAllTodo=(done)=>{
		//获取原来的todos
		const{todos}=this.state
		//f加工数据
		const newTodos=todos.map((todoObj)=>{
           return {...todoObj, done:done}
		})
		//更新状态
		this.setState({todos:newTodos})
	}

	//用于清除所有已经完成的，footer
	clearAllDone=()=>{
		//获取原来的todos
		const {todos}=this.state
		const newTodos= todos.filter((todoObj)=>{
			return todoObj.done === false
			//return !todoObj.done
		})
		this.setState({todos:newTodos})

	}


	render() {
		const {todos} = this.state
		return (
			<div className="todo-container">
			<div className="todo-wrap">
				<Header addTodo={this.addTodo}/>
				<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/> {/**父组件【App】给子组件【List】传递数据 */}
				<Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
			</div>
		  </div>
		)
	}
}
