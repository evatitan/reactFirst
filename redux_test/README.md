## V 100 ——求和案例redux精简版（自写笔记）
# 去除Count组件自身的状态
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
