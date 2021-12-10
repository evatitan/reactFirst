import React,{Component} from "react";
import axios from "axios";
import PubSub from "pubsub-js";
import "./index.css";

export default class Search extends Component{
    search=()=>{
        // console.log(this.keyWordElement.value)
        const {keyWordElement:{value:keyWord}}=this;
        PubSub.publish('keyWord',{isFirst:false,isLoading:true })        
        // this.props.updateAppstate({isFirst:false,isLoading:true});

        axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
            response=>{
                PubSub.publish('keyWord',{isLoading:false, users:response.data.items})
                // this.props.updateAppstate({isLoading:false,users:response.data.items});
                
            },
            error=>{
                PubSub.publish('keyWord',{err:error.message})
                // this.props.updateAppstate({isLoading:false,err:error.message})
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