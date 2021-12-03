// 引入Count的 UI组件
import CountUI from "../../components/Count";
// 引入action
import {createIncrementAction,createDecrementAction,createDecrementAsyncAction} from "../../redux/count_action"
// 引入connect 方法用于链接 UI组件和 redux
import {connect} from 'react-redux';

// 映射状态
// const mapStateToProps= state => {count:state}

// 映射操作状态的方法
// const mapDispatchToProps= (dispatch)=>(
//     {
//         increment:number=>dispatch(createIncrementAction(number)),
//         decrement:number=>dispatch(createDecrementAction(number)),
//         asyncIncrement:(number,time)=>dispatch(createDecrementAsyncAction(number,time))
//     }
// )

// 创建并暴露一个Count的容器组件，已经链接好 容器组件 和 UI 组件,暂时未关联容器组件和 redux
// export default connect()(CountUI)
export default connect(
    state=> ({count:state}),
    
    // mapDispatchToProps的一般写法，是函数形式
    // (dispatch)=>({
    //         increment:number=>dispatch(createIncrementAction(number)),
    //         decrement:number=>dispatch(createDecrementAction(number)),
    //         asyncIncrement:(number,time)=>dispatch(createDecrementAsyncAction(number,time))
    //     })

    // mapDispatchToProps的简写版，是对象形式，此处react-redux能自助分发action给store。
    {
        increment:createIncrementAction,
        decrement:createDecrementAction,
        asyncIncrement:createDecrementAsyncAction
    }
)(CountUI)

