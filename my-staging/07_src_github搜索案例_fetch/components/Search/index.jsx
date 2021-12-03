import React,{Component} from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component{
   
  //发布消息
   search= async ()=>{
     //获取用户的输入数据  console.log(this.keyWordElement.value)
     const {keyWordElement:{value:keyword}}=this  
     // 发送请求前，通知 List 更新状态值
     PubSub.publish('search',{isFirst:false,isLoading:true})

     
      // //【使用axios发送请求】
      // axios.get(`http://localhost:3000/api1/search/users2?q=${keyword}`).then(
      // response=>{
      //   // 请求成功后，通知 APP 更新状态
      //  PubSub.publish('search',{isLoading:false,users:response.data.items})
      // },
      // //失败后，通知 App更新状态
      // error => {
      //   PubSub.publish('search',{isLoading:false,err:error.message})
      // }
      // )

      // //【fetch 发送请求】 第一步联系服务器，第二步获取数据。——————【未优化版本】
      // fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`).then(
      //   response=>{
      //     console.log('成功联系服务器')
      //     return response.json()
      //   },error=>{  //如果此处失败的回调返回的是一个非promise的值，那么第一个then返回的promise实例状态就是成功的，值为undefined。然后继续第二个then回调。
      //     console.log('失败联系服务器',error)
      //     return new Promise(()=>{}) // 【中止promise链】操作是因为：防止联系服务器失败，程序继续走then回调，继而返回获取数据成功（undefined），所以此处返回一个初始化的promise进行中止。
      //   }  
      // ).then(
      //   response=>{console.log('获取数据成功',response)},
      //   error=>{console.log('获取数据失败',error)}
      // )

      // //【fetch 发送请求】——————【优化版本】
      // fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`).then(
      //   response=>{
      //     console.log('成功联系服务器')
      //     return response.json()
      //   }
      // ).then(
      //   response=>{console.log('获取数据成功',response)}
      // ).catch(
      //   error=>{console.log('获取数据失败',error)}
      // )

      //【fetch发送请求】——————【最终优化版本】
      try {
        const response = await fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`)
        const data = await response.json()
        PubSub.publish('search',{isLoading:false,users:data.items})
      } catch (error) {
        console.log(error)
        PubSub.publish('search',{isLoading:false,err:error.message})
      }

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