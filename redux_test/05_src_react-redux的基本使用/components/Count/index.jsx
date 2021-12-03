import React,{Component} from 'react';

export default class index extends Component {

    increment=()=>{
        const {value}= this.selectionNumber;  
        this.props.increment(value*1)    
    }

    decrement=()=>{
        const {value} = this.selectionNumber;
        this.props.decrement(value*1) 
    }

    sumOdd=()=>{
        const {value} = this.selectionNumber;
        if(this.props.count%2!==0){
        this.props.increment(value*1)
        }
    }

    sumAsync=()=>{
        const {value} = this.selectionNumber
        this.props.asyncIncrement(value*1,3000)
    }

    render() {
        //console.log("UI>>>",this.props )
        return <div>
            <h1>sum: {this.props.count}</h1>
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



