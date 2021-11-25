import React,{Component} from "react";
import {Link,Route,Switch} from 'react-router-dom'
import Detail from "./Detail";

export default class Message extends Component {
  state={
    messageArr:[
      {id:'01',title:'message from Monday'},
      {id:'02',title:'message from Tuesday'},
      {id:'03',title:'message from Wednesday'}
    ]
  }

    render() {
      const {messageArr}=this.state
        return (
            <div>
                <ul>
                  {
                    messageArr.map((msgObj)=>{
                      return (
                        <li key={msgObj.id}>
                          {/* 向路由组件传递 params 参数 */}
                          <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
                <hr />
                <Switch>
                  {/* 声明接受 params 参数 */}
                  <Route path='/home/message/detail/:id/:title' component={Detail}/>
                </Switch>
            </div>
        );
    }
}
