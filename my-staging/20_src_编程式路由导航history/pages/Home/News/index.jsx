import React,{Component} from "react";

export default class News extends Component {
    // 效果图： 在news页面停留2秒后自动切换到message页面
    // componentDidMount(){
    //     setTimeout(()=>{
    //         this.props.history.push('/home/message')
    //     },2000)
    // }
    render() {
        return (
            <div>
                <ul>
                  <li>news001</li>
                  <li>news002</li>
                  <li>news003</li>
                </ul>
            </div>
        );
    }
}
