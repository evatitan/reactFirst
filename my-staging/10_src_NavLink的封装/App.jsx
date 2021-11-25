import React,{Component} from "react";
import {Route} from 'react-router-dom';  // 需要暴露很多东西， NavLink的设计理念时，点谁谁高亮

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
                    <MyNavLink to="/about"> About</MyNavLink> 
                    <MyNavLink to="/home"> Home</MyNavLink>

                </div>
              </div>
              <div className="col-xs-6">
                <div className="panel">
                  <div className="panel-body">
                    {/*  */}
                    <Route path ="/about" component={About}/>
                    <Route path ="/home" component={Home}/> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}