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
                          {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}

                          {/* 向路由组件传递 search 参数,类似ajax的query参数 */}
                          <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
                <hr />
                <Switch>
                  {/* 声明接受 params 参数 */}
                  {/* <Route path='/home/message/detail/:id/:title' component={Detail}/> */}

                  {/* search 参数无需声明接受，正常注册路由即可 */}
                  <Route path='/home/message/detail' component={Detail}/>
                </Switch>
            </div>
        );
    }
}
