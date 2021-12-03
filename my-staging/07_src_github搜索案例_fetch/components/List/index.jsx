import React,{Component} from "react";
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component{

    state={
      users:[],  // 初始化状态，users初始为数组
      isFirst:true,  // 标识是否为第一次打开页面，当点击search，此值需变为：false。
      isLoading:false,  // 标识是否在加载中，当发送出请求，此值需变为：true，当接受到结果，此值需变回。
      err:'' // 存储请求相关的错误信息
    }

    // 订阅消息
    componentDidMount(){
      this.token=PubSub.subscribe('search',(_,stateObj)=>{
        this.setState(stateObj)
      })
    }

    // 最后需要结束消息订阅
    componentWillUnmount(){
      PubSub.unsubscribe(this.token)
    }

    render(){

      const {users,isFirst,isLoading,err} = this.state

        return (
            <div className="row">
              {
                isFirst? <h2>Welcome to the page</h2> :
                isLoading? <h2>Loading</h2>:
                err? <h2 style={{color:'red'}}>{err}</h2>: 

                users.map((userObj)=>{
                  return (
                    <div key={userObj.id} className="card">
                      <a rel="noreferrer" href={userObj.html_url} target="_blank" >
                        <img alt="avatar" src={userObj.avatar_url} style={{width: '100px'}}/>
                      </a>
                      <p className="card-text">{userObj.login}</p>
                    </div>
                  )
                })
              }
            </div>
        )
    }
}