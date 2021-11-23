import React,{Component} from "react";
import Search from "./components/Search";
import List from "./components/List";

export default class App extends Component{

    state={
        users:[],  // 初始化状态，users初始为数组
        isFirst:true,  // 标识是否为第一次打开页面，当点击search，此值需变为：false。
        isLoading:false,  // 标识是否在加载中，当发送出请求，此值需变为：true，当接受到结果，此值需变回。
        err:'' // 存储请求相关的错误信息
    }
     //更新App的state
    updateAppState=(stateObj)=>{
        this.setState(stateObj)
    }

    render(){
        return(
            <div className="container">
                <Search updateAppState={this.updateAppState}/>
                <List {...this.state}/> 
            </div>
        )
    }

}