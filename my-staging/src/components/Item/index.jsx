import React,{Component} from 'react';
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {

  //，需要引入prop-types库，对接受的props进行类型和必要性的限制
  static propTypes={
    todos:PropTypes.array.isRequired,
    updateTodo:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired
  }

  // 标识鼠标的移入和移出
  state={mouse:false} 

  //鼠标移入移出的回调
  handleMouse=(flag)=>{
    return () =>{
      //console.log(flag)
      this.setState({mouse:flag})
    }
  }

  //勾选，取消勾选某一个todo的回调【高阶】
  handleCheck=(id)=>{
    return (event)=>{
      this.props.updateTodo(id,event.target.checked)
    }
  }

  //删除todo的回调
  handleDelete=(id)=>{
    if(window.confirm('确定删除吗？')){
      this.props.deleteTodo(id)
    }
  }

    render() {
      const {id,name,done}=this.props
      const {mouse} = this.state

        return (
            <li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
            <label>
              <input type="checkbox" defaultChecked={done} onChange={this.handleCheck(id)}/>
              <span>{name}</span>
            </label>
            <button onClick={()=>{this.handleDelete(id)}} className="btn btn-danger" style={{display:mouse? 'block':'none'}}>删除</button>
          </li>
        )
    }
}