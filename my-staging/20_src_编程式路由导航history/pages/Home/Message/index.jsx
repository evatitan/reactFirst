import React,{Component} from "react";
import {Link,Route} from 'react-router-dom'
import Detail from "./Detail";

export default class Message extends Component {
  state={
    messageArr:[
      {id:'01',title:'message from Monday'},
      {id:'02',title:'message from Tuesday'},
      {id:'03',title:'message from Wednesday'}
    ]
  }

  showReplace=(id,title)=>{
    // 实现 replace 跳转到Detail组件，【携带 params 参数】
    // this.props.history.replace(`/home/message/detail/${id}/${title}`)

    // 实现 replace 跳转到Detail组件，【携带 query 参数】
    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

    // 实现 replace 跳转到Detail组件，【携带 state 参数】
    this.props.history.replace(`/home/message/detail`,{id,title})
  }

  showPush=(id,title)=>{
     // 实现 push 跳转到Detail组件，【携带 params 参数】
    // this.props.histroy.push(`/home/message/detail/${id}/${title}`)

    // 实现 push 跳转到Detail组件，【携带 query 参数】
    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

    // 实现 push 跳转到Detail组件，【携带 state 参数】
    this.props.history.push(`/home/message/detail`,{id,title})
  }

  back=()=>{
    this.props.history.goBack()
  }

  forward=()=>{
    this.props.history.goForward()
  }

  go=()=>{
    this.props.history.go(-2)
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
                          {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                          {/* 向路由组件传递 state 参数 */}
                          <Link to={{pathname:'/home/message/detail/',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>

                          &nbsp;<button onClick={()=>{this.showPush(msgObj.id,msgObj.title)}}>Push</button>
                          &nbsp;<button onClick={()=>this.showReplace(msgObj.id,msgObj.title)}>Replace</button>
                        </li>
                      )
                    })
                  }
                </ul>
                <hr />

                  {/* 声明接受 params 参数 */}
                  {/* <Route path='/home/message/detail/:id/:title' component={Detail}/> */}

                  {/* search 参数无需声明接受，正常注册路由即可 */}
                  {/* <Route path='/home/message/detail' component={Detail}/> */}

                  {/* state 参数无需声明接受，正常注册路由即可 */}
                  <Route path='/home/message/detail' component={Detail}/>

                <button onClick={this.back}>GoBack</button> &nbsp;
                <button onClick={this.forward}>GoForward</button> &nbsp;
                <button onClick={this.go}>GO</button>
            </div>
        );
    }
}
