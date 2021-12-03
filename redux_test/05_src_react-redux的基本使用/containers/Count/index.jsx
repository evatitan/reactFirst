// 引入Count的 UI组件
import CountUI from "../../components/Count";
// 引入action
import {createIncrementAction,createDecrementAction,createDecrementAsyncAction} from "../../redux/count_action"
// 引入connect 方法用于链接 UI组件和 redux
import {connect} from 'react-redux';

/*
 * 1. mapStateToProp 函数返回的是一个对象。
 * 2. mapStateToProps 函数的返回的对象中的key就作为传递给UI组件中的props的key，Value就作为UI组件中props的 Value 
 * 3. mapStateToProps 用于传递状态    
 * 备注： react-redux 在调用此函数时，已经将state传入进去，所以不需要此文件中自行引入store，只需接受直接使用即可。
*/ 
function mapStateToProps (state){
    return {count:state}
}

/*
 * 1. mapDispatchToProp 函数返回的是一个对象。
 * 2. mapDispatchToProp 函数的返回的对象中的key就作为传递给UI组件中的props的key，Value就作为UI组件中props的 Value 
 * 3. mapDispatchToProp 用于传递操作状态的方法    
 * 备注： react-redux 在调用此函数时，已经将state传入进去，所以不需要此文件中自行引入store，只需接受直接使用即可，其身上的API也是如此。
*/ 
function mapDispatchToProps (dispatch){
    return {
        increment:number=>dispatch(createIncrementAction(number)),
        decrement:number=>dispatch(createDecrementAction(number)),
        asyncIncrement:(number,time)=>dispatch(createDecrementAsyncAction(number,time))
    }
}

// 创建并暴露一个Count的容器组件，已经链接好 容器组件 和 UI 组件,暂时未关联容器组件和 redux
// export default connect()(CountUI)
const CountContainer = connect(mapStateToProps,mapDispatchToProps)(CountUI);
export default CountContainer


