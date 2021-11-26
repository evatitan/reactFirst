import React,{Component} from "react";
// import qs from 'querystring'
const detailData = [
    {id:'01',content:'Hello, Monday'},
    {id:'02',content:'Hello, Tuesday'},
    {id:'03',content:'Hello, Wednesday'},
]

export default class Detail extends Component {
    render() {
        console.log(this.props)

        // 接受 params 参数, 落在 match 方法上面
        // const {id,title} = this.props.match.params
        
        // 接受 search 参数， 落在 location 方法上面
        // const {search}=this.props.location
        // const {id,title}= qs.parse(search.slice(1)) // 利用querystring 加工urlencoded为对象，且去处最前面的问号？


        //接受 state 参数， 落在 location 方法上面
        const {id,title}=this.props.location.state  || {}   // 此处提供 || {} 防止网页的历史记录被清除后（因为location是history上面的一个api），网页不报错误，而是返回空对象。

        const findResult = detailData.find((detailObj)=>{
            return detailObj.id ===id
        }) || {}     // // 此处提供 || {} 防止网页的历史记录被清除后（因为location是history上面的一个api），网页不报错误，而是返回空对象。

        return (
            <div>
                <ul>
                  <li>ID:{id}</li>
                  <li>Title: {title}</li>
                  <li>Content: {findResult.content}</li>
                </ul>
            </div>
        );
    }
}
