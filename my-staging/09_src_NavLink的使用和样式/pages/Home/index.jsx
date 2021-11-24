import React,{Component} from "react";

export default class Home extends Component{
    render(){
        console.log('Header收到的是', this.props)
        return (
            <h3>我是Home的内容</h3>
        )
    }
}