import React,{Component} from 'react';

export default class index extends Component {

    state={count:0}
    // 加法
    increament=()=>{
        const {value}=this.selectNumber;
        const {count}= this.state;
        this.setState({count:count+value*1})
    }
    // 减法
    decreament=()=>{
        const {value}=this.selectNumber;
        const {count}=this.state;
        this.setState({count:count-value*1})
    }
    // 当前求和是奇数就 + 
    incrementIfOdd=()=>{
        const {value}=this.selectNumber;
        const {count}=this.state;
        if(count%2!==0) return this.setState({count:count+value*1})
    }
    // 异步 + 
    incrementAsync=()=>{
        const {value}=this.selectNumber;
        const {count}=this.state;
        setTimeout(()=>{
            this.setState({count:count+value*1})

        },4000)
    }

    render() {
        return <div>
            <h1>sum: {this.state.count}</h1>
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



