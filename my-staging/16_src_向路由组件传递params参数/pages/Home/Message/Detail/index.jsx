import React,{Component} from "react";

const detailData = [
    {id:'01',content:'Hello, Monday'},
    {id:'02',content:'Hello, Tuesday'},
    {id:'03',content:'Hello, Wednesday'},
]

export default class Detail extends Component {
    render() {
        //console.log(this.props)
        // 接受 params 参数
        const {id,title} = this.props.match.params
        const findResult = detailData.find((detailObj)=>{
            return detailObj.id ===id
        })
        return (
            <div>
                <ul>
                  <li>ID: {id}</li>
                  <li>Title: {title}</li>
                  <li>Content: {findResult.content}</li>
                </ul>
            </div>
        );
    }
}
