import React,{Component} from "react";
// 引入redux的核心，store
import store from "./redux/store";

// 因为使用了容器组件和UI组件，所以不应该渲染UI组件，而应该渲染contianer组件，它是父组件。
//import Count from "./components/Count";
//
import Count from "./containers/Count"

export default class App extends Component{
    render(){
        return (
            <div>
                {/* 渲染容器组件Count并且为其传递store，简称【链接】。注意：store的引入不应在组件内部引入，需在此处以props形式传递。 */}
                <Count store={store}/>
            </div>
        )
    }
}