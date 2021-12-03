import React,{Component} from "react";
import PubSub from "pubsub-js"
import "./index.css";

export default class List extends Component{

    state={
        users:[],
        isFirst:true,
        isLoading:false,
        err:""
    }

    componentDidMount(){
        this.token =PubSub.subscribe('keyWord',(msg,stateObj)=>{
            //console.log(msg,stateObj)
            this.setState(stateObj)
        })
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }


    render(){
        const {users,isFirst,isLoading,err}=this.state
        return(
            <div className="row">
                {
                    isFirst ? <h4>Welcome to Github User Search </h4> :
                    isLoading ? <h4>Loading...</h4> :
                    err? <h4 style={{color:'red'}}>{err}</h4> :
                    users.map((userObj)=>{
                        return (
                            <div key={userObj.id} className="card">
                                <a href={userObj.html_url}>
                                    <img src={userObj.avatar_url} alt="avatar" style={{width:'100px'}} />
                                </a>
                                <p className="card_text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}