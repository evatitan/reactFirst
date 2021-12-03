import React,{Component} from 'react';
//引入store，用于获取redux中保存的状态
import store from '../../redux/store';
import {createIncrementAction,createDecrementAction,createDecrementAsyncAction} from '../../redux/count_action';


export default class index extends Component {

    // componentDidMount(){
    //     store.subscribe(()=>{
    //         this.setState({})
    //     })
    // }
    
    increment=()=>{
        const {value}= this.selectionNumber
        store.dispatch(createIncrementAction(value*1))
    }

    decrement=()=>{
        const {value} = this.selectionNumber
        store.dispatch(createDecrementAction(value*1))
    }

    sumOdd=()=>{
        const {value} = this.selectionNumber;
        const count = store.getState();
        if(count%2!==0){
            store.dispatch(createIncrementAction(value*1))
        }
    }

    sumAsync=()=>{
        setTimeout(()=>{
            const {value} = this.selectionNumber
            store.dispatch(createDecrementAsyncAction(value*1))
        },2000)
    }

    render() {
        return <div>
            <h1>sum:  {store.getState()}</h1>
            <select ref={c=>{this.selectionNumber=c}}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.increment}> + </button>&nbsp;
            <button onClick={this.decrement}> - </button>&nbsp;
            <button onClick={this.sumOdd}> + when sum is odd</button>&nbsp;
            <button onClick={this.sumAsync}> sum async </button>&nbsp;
        </div>;
    }
}



