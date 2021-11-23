import React,{Component} from "react";
import axios from 'axios'

export default class Search extends Component{
  /**[发送网络请求]
     * 此处没有产生跨域问题，因为github服务器使用cors（加了特殊的响应头）在后端解决了跨域。
     * axios.get(`https://api.github.com/search/users?q=${keyword}`).then(
     * response=>{console.log('success',response)},
     * error=>{console.log('error',error)})
    */ 
  
  search=()=>{
    //获取用户的输入
    //const {value}=this.keyWordElement  //简单赋值方法。
    const {keyWordElement:{value:keyWord}}=this  //连续结构赋值方法，但是keyWordElement没有被定义【见小知识09】。
    //发送请求前，通知App更新状态
    this.props.updateAppState({isFirst:false,isLoading:true})
    // 发送网络请求，且配置代理。
    axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
      response=>{
        // 请求成功后，通知app更新状态。
        this.props.updateAppState({isLoading:false,users:response.data.items})
      },
      error=>{
        //请求失败后，通知app更新状态
        this.props.updateAppState({isLoading:false,err:error.message})
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