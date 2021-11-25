import React,{Component} from "react";
import {Route,Switch,Redirect} from 'react-router-dom';  // Switch 用于程序在注册路由板块，对路径进行匹配后则不再继续进行匹配。

import Header from "./components/Header";    // 一般组件
import MyNavLink from "./components/MyNavLink"; 
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
                    {/* 标签体【About】其实也是一个特殊的标签属性， this.props.children可以获取组件标签体内容。*/}
                    <MyNavLink to="/about"> About </MyNavLink> 
                    <MyNavLink to="/home"> Home </MyNavLink>
                </div>
              </div>
              <div className="col-xs-6">
                <div className="panel">
                  <div className="panel-body">
                    <Switch> 
                      <Route path ="/about" component={About}/>
                      <Route path ="/home" component={Home}/> 
                      {/* Redirect 重定向，如果以上都没有匹配上，最后去redirect指定的路径 */}
                      <Redirect to="/about"/>
                    </Switch> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}