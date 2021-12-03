import React,{Component} from "react";
import axios from "axios";
import "./index.css";

export default class Search extends Component{
    search=()=>{
        // console.log(this.keyWordElement.value)
        const {keyWordElement:{value:keyWord}}=this;
        this.props.updateAppstate({isFirst:false,isLoading:true});
        axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
            response=>{
                this.props.updateAppstate({isLoading:false,users:response.data.items});
            },
            error=>{
                this.props.updateAppstate({isLoading:false,err:error.message})
            }
        )
    }

    render(){
        return(
            <section >
                <h3>Search Github User</h3>
                <div>
                    <input ref={c=>this.keyWordElement =c} type="text" placeholder="enter the name you search"/>
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}