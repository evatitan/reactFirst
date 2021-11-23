import React,{Component} from "react";
import axios from 'axios'
import "./App.css"

export default class App extends Component{
    /**【3000-5000跨域报错， Access-Control-Allow-Origin 】  ———— 见【react脚手架配置代理.md】文件。
     * 解决方案需要配置代理【proxy】： 
     *  方法一（配置单一代理）：在package.json文件最后加上： "proxy":"http://localhost:5000"，并且此文件中的axios.get('')中5000改为3000。  
     *        注解： 所有在3000里面【public文件中】无法寻找到的请求，则会进入到5000。
     *        弊端： 如果有多个服务器，无法实现单一的代理连接多个服务器，因为在"proxy":"http://localhost:5000"中是写死的。
     *  方法二（配置多个服务器代理）： 
     *  1. src文件夹中建立setupProxy文件，进行代理配置。
     *  2. 配置完毕后，在本文件中的url中需要加入api1这样的信息，以便连接具体的代理。
     * */
    getStudentData=()=>{
        axios.get('http://localhost:3000/api1/students').then(
            response =>{console.log('success',response)},
            error=>{console.log('error',error)}
        )
    }

    getCarData=()=>{
        axios.get('http://localhost:3000/api2/cars').then(
            response =>{console.log('success',response)},
            error=>{console.log('error',error)}
        )
    }

    render(){
        return(
            <div>
                <button onClick={this.getStudentData}>点我获取学生信息</button>
                <button onClick={this.getCarData}>点我获取汽车信息</button>
            </div>
        )
    }
}