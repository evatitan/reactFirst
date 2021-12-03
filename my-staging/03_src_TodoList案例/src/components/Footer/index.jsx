import React,{Component} from 'react';
import './index.css'

export default class Footer extends Component {
  //全选checkbox的回调
  handleCheckAll=(event)=>{
    this.props.checkAllTodo(event.target.checked)
  }

  //handleClearAll
  handleClearAllDone=()=>{
    this.props.clearAllDone()
  }

    render() {
      const {todos}=this.props
      //已经完成的todos,进行条件统计 -reduce
      const doneCount =  todos.reduce((pre,todo)=> pre + (todo.done? 1 : 0),0)
      //console.log("@@@",doneCount)

      //总数
      const total = todos.length

        return (
            <div className="todo-footer">
            <label>
              {/**defaultChecked只作用于一次，但是checked可以使用多次，以最后一次值为准 */}
              <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount===total && total!== 0? true:false} />
            </label>
            <span>
              <span>已完成{doneCount}</span> / 全部{total}
            </span>
            <button onClick = {this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
          </div>
        )
    }
}
