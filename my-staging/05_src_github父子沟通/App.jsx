import React,{Component} from "react";
import Search from "./components/Search";
import List from "./components/List";



export default class App extends Component {

  state={
    users:[],
    isFirst:true,
    isLoading:false,
    err:""
  }


  updateAppstate=(stateObj)=>{
    this.setState(stateObj)
  }

  render() {

    return (
      <div className="container">
        <Search updateAppstate={this.updateAppstate}/>
        <List {...this.state}/>
      </div>
    );
  }
}

 