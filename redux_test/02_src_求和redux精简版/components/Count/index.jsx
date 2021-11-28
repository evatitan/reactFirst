import React,{Component} from 'react';
//引入store，用于获取redux中保存的状态
import store from "../../redux/store"

export default class index extends Component {

    // // 需要在该组件加载完成时，进行检测 redux 中的状态变化，所以使用这个 钩子。
    // componentDidMount(){
    //     //订阅且检测 redux 中状态的变化，只要变化，就调用render
    //     store.subscribe(()=>{
    //         // 调用 利用setState 方法通知组件需要“更新状态”（实际上没有），组件就会接到通知，更新 render
    //         this.setState({})
    //     })
    // }

    // 加法
    increament=()=>{
        const {value}=this.selectNumber;
        //通知redux+ value
        store.dispatch({type:'increment', data:value*1})
    }
    // 减法
    decreament=()=>{
        const {value}=this.selectNumber;
        store.dispatch({type:"decrement",data:value*1})
    }
    // 当前求和是奇数就 + 
    incrementIfOdd=()=>{
        const {value}=this.selectNumber;
        const count = store.getState()
        if(count%2!==0){
            store.dispatch({type:"increment",data:value*1})
        }
    }
    // 异步 + 
    incrementAsync=()=>{
        const {value}=this.selectNumber;
        setTimeout(()=>{
            store.dispatch({type:"increment",data:value*1})
        },4000)
    }

    render() {
        return <div>
            <h1>sum: {store.getState()}</h1>
            <select ref={c=>{this.selectNumber=c}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.increament}> + </button>&nbsp;
            <button onClick={this.decreament}> - </button>&nbsp;
            <button onClick={this.incrementIfOdd}> + when sum is odd</button>&nbsp;
            <button onClick={this.incrementAsync}> sum async </button>&nbsp;
        </div>;
    }
}



