## V 100 ——求和案例redux精简版（自写笔记）
## 去除Count组件自身的状态
1. 下载redux库，创建redux文件夹，建立store和count_redux（为Count组件服务）文件且对外暴露。
   . store来自于redux库，需要引入 ———— import {createStore} from "redux"。
   . countReducer是纯函数且为store服务 ———— import countReducer from "count_redux.js"。
   . countReducer是自己根据功能需求写的函数，对状态数据进行操作，但是只负责维护状态，并不调用render。
   . 将countReducer（纯函数）传递给store ———— const store = createStore(countReducer)。
   . 对外暴露新建立的store。

   备注： 为一个组件独立配置一个reducer，并赋给新创建的store，最后对外进行暴露。

2. 在具体子组件中：
   . 引入store, 使用它的API
   . API 1 ： store.getState()  ———— 用于获取store中的数据状态，但是store中的数据状态，来自reducer。
   . API 2 ： store.dispatch({type,data}) ———— 用于子组件给store传递action，此案例中是使用自己打包的action。
   . API 3 ： store.subscribe(()=>{this.setState()}) ———— 用于在componentDidMount钩子中进行订阅和监听redux中store的数据状态，进而在子组件挂在完毕时，调用render更新DOM。
   . 在indexjs总文件中，使用 API 3 ———— 如果状态有所改变，在本文件中直接对整个APP组件进行监听+调用render。 不必在子组件中进行监听，且diffing算法，不会导致工作量巨大。
    store.subscribe(() => {
	    ReactDOM.render(<App />, document.getElementById('root'));
    });

## V 100 ——求和案例redux精简版（视频中的笔记）
1. 去除Count组件自身的状态
2. src下建立： 
          - redux
             -store.js
             -count_reducer.js
3. store.js:
   . 引入redux中的createStore 函数，创建一个store，
   . createStore调用时要传入一个为其服务的reducer。
   . 需要暴露store对象
4. count_reducer.js:
   . reducer的本质时一个函数，接受：preState，action，返回加工后的状态。
   . reducer有2个作用：初始化状态，加工状态
   . reducer 被第一次调用时，是store自动触发的，
           - 传递的是preState是undefined,
           - 传递的action是；{type:'@@REDUX/INIT_2.e.4.s'}   
5. 在总 index.js中检测store中状态的改变，一旦发送改变重新渲染<App/>
   备注：redux只负责管理状态，至于状态的改变驱动者页面的展示，需要自己写。


## V 101 ——求和案例redux完整版（视频笔记）
1. 新增文件：
         - count_action.js  专门用于创建action对象
         - constant.js      放置由于编码疏忽写错的action中的type。

## V 102 ——求和案例redux的异步 action 版 （视频笔记）
1. 同步action：action的值是一个OBJ{}
2. 异步action : action的值是一个function(){}
3. 明确： 延迟的动作不想交给组件自身，交给action。
4. 何时需要异步action： 想要对状态进行操作，但是具体的数据靠异步任务返回。
5. 具体编码： 
          . npm i redux-thunk ，并配置在store中。
          . 创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
          . 异步任务有结果后，分发一个同步action区真正操作数据。
6. 备注： 异步action不是必须要写的，完全可以自己等待异步任务的结果后在区分发同步action。 

## V 103 ——求和案例react-redux的基本使用 （自写笔记） ： react-redux 库是来自官方库，之前使用的是redux库 【有图】
1. react-redux 将所有的组件分为两类：【容器组件】【UI组件】，所有的【UI组件】都应该被包裹在【容器组件】中，父子关系交流借助 props。
2. 【容器组件】和redux交流(在App组件中通过传递props的方式，而不是组件中自己引入)，可以随意使用redux的 API， 【UI组件】不可以使用。 
3. 【容器组件】会给【UI组件】传递： 1). redux中所保存的状态。 2). 用于操作状态的方法 —— store.dispatch(action)
4. 备注: 【容器组件】给【UI组件】传递：共享状态，操作状态的方法，均通过props传递。

## V 103 ——求和案例react-redux的基本使用 （视频笔记） 
1. 明确两个概念
   .UI组件：
   .容器组件：
2. 如何创建一个容器组件 —— 靠react-redux的connect函数
   connect(mapStateToProps,mapDispatchToProps)(UI组件)
   - mapStateToProps: 映射状态，返回值时一个对象。
   - mapDispatchToProps: 映射操作状态的方法，返回值时一个对象。
3. 备注1：容器组件中的store时靠props传进去的，而不是在容器组件中直接引入。
   备注2：mapDispatchToProps，也可以是一个对象。