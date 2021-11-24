import React,{Component} from "react";
import {NavLink,Routes,Route} from 'react-router-dom';  // 需要暴露很多东西， NavLink的设计理念时，点谁谁高亮

import Header from "./components/Header";    // 一般组件
import Home from "./pages/Home";             // 路由组件
import About from "./pages/About";

export default class App extends Component{
    render(){
        return(
            <div>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                  <Header />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 col-xs-offset-2">
                <div className="list-group">
                    {/* 原生html中，靠 <a> 跳转不同的页面 */}
                    {/* <a className="list-group-item" href="./about.html">About</a>
                    <a className="list-group-item active" href="./home.html">Home</a> */}
  
                    {/* 在react中，靠路由链接跳转不同的页面,需要引入 Link ,需要在index.js总文件中引入BrowserRouter，对所有路由进行路由器包裹。 ---------- 编写路由链接*/}
                    <NavLink className="list-group-item" to="/about">About</NavLink>
                    <NavLink className="list-group-item" to="/home">Home</NavLink>
                </div>
              </div>
              <div className="col-xs-6">
                <div className="panel">
                    <div className="panel-body">
                    {/* 引入 Route,写入 2 个参数 --------- 注册路由 */}
                    <Routes>
                       {/* 旧写法: <Route path ="/about" component ={About}/> */}
                        <Route path ="/about" element ={<About/>}/>
                        <Route path ="/home" element ={<Home/>}/> 
                    </Routes>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}