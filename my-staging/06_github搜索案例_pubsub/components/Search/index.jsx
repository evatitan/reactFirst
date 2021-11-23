import React,{Component} from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component{

   search=()=>{
     //获取用户的输入数据
     // console.log(this.keyWordElement.value)
     const {keyWordElement:{value:keyword}}=this  
     // 发送请求前，通知 List 更新状态值
     PubSub.publish('search',{isFirst:false,isLoading:true})
     //发送请求
     axios.get(`http://localhost:3000/api1/search/users?q=${keyword}`).then(
       response=>{
         // 请求成功后，通知 APP 更新状态
        PubSub.publish('search',{isLoading:false,users:response.data.items})
       },
       //失败后，通知 App更新状态
      error => {
        PubSub.publish('search',{isLoading:false,err:error.message})
      }
     )
   }
    render(){
        return(
            <section className="jumbotron">
              <h3 className="jumbotron-heading">Search Github Users</h3>
              <div>
                <input ref={c=>this.keyWordElement=c}type="text" placeholder="enter the name you search"/>&nbsp;
                <button onClick={this.search}>Search</button>
              </div>
            </section>
        )
    }
}