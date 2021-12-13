### 第一章：React入门
### 第二章：React面向组件编程

### 第三章：React应用，基于脚手架
## todoList 案例相关知识点
1. 拆分组件，实现静态组件，注意：className，style的写法。
2. 动态化初始列表，如何确定将数据放在哪个组件的state中。
   —— 某个组件使用：放在自身的state中
   —— 某些组件使用：放在他们共同的父组件state中（官方称此操作：状态提升）
3. 关于父子之间通信
   —— 【父亲组件】给【子组件】传递数据： 通过props传递
   —— 【子组件】给【父亲组件】传递数据： 通过props传递，要求父亲提前给子传递一个函数
4. 注意defaultChecked 和 checked 的区别，类似的还有： defaultValue 和 Value
5. 状态在哪里，操作状态的方法就在那里。


## 第四章：React ajax
## axio 发送请求
1. 代理的设置
2. axios.get(url).then(response=>{},error=>{})
## 消息订阅——消息发布 （兄弟组件的沟通）
1. 学习链接：https://github.com/mroderick/PubSubJS
2. 消息订阅：
 . this.token = PubSub.subscribe('myTopic',()=>{}) 
 . 保持myTopic一致。
 . 从其他组件获取相关消息。
 . 回调函数中可以对所获得的数据进行操作。 
3. 消息发布：
 . PubSub.publish('myTopic',{data})
 . 保持myTopic一致。
 . 将data数据传给订阅者。
4. 取消订阅（如果相关组件被删除或者其他原因不在，需要取消订阅）
 . PubSub.unsubscribe(this.token), 此处要求给当初的订阅机制取名“this.token”
 . componentWillUnmount中设置
## fetch 发送请求
1. 几种发送请求的方式
 . xhr（传统AJAX） ： window自带，但是封装设置较为繁琐，没有那么好用的api，也有回调地狱。
   . jQuery       ： 已经封装好，但是因为使用的是回调函数，5次即形成回调地狱。                       【第三方，需要下载】
   . axios        ： 使用promise，避免回调地狱，有拦截器。 / axios通过封装http，也能从服务端发送请求           【第三方，需要下载】
   在两者都是对 xhr 的封装，

 . Fetch     ： windom自带，内置可直接用，使用【关注分离】原则。
   . 不是第三方库，无需下载，有浏览器即可用。
   . Promise风格，避免回调地狱。
   . 可以使用async，await函数。
   . fetch在老版本兼容性不是很好。
## github搜索案例总结
1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办？
2. ES6小知识：解构赋值 + 重命名
   let obj = {a:{b:1}}
   const {a} = obj;      // 传统解构赋值
   const {a:{b} = obj;   // 连续解构赋值
   const {a:{b:value}};  // 连续解构赋值 + 重命名
3. 消息订阅与发布机制
   —— 先订阅，再发布（理解：如隔空对话）
   —— 使用于任意组件间通信
   —— 要在组件的 componentWillUnmount中取消订阅
4. fetch 发送请求（“关注分离“的设计思想）
    try {
        const response = await fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`)
        const data = await response.json()
        PubSub.publish('search',{isLoading:false,users:data.items})
      } catch (error) {
        console.log(error)
        PubSub.publish('search',{isLoading:false,err:error.message})
      }

## 第五章：React Router 【v 74-78】
## SPA （single page application） —— 单页面多组件
1. 单页web应用，点击页面中的链接不会刷新页面，只会做页面的局部更新。
2. 数据都需要通过ajax请求获取，并在前端异步展现。
## 路由
1. 一个路由就是一个映射关系（key：Value）
2. key 为路径， value可能是function 或 component
3. 路由分类：
   —— 后端路由：
      . 理解：Value 是function，同来处理客户端提交的请求。
      . 注册路由： router.get(path,function(req,res))。
      . 工作过程： 当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据。
   —— 前端路由：
      . 浏览器端路由：Value时component，用于展示页面内容。
      . 注册路由：< Router path="/test",component = {Test}>。
      . 工作过程；当浏览器path变为/test时，当前路由组件会变成 Test组件。
   —— 前端路由工作原理:
      . BOM history —— 前端路由的基石，见【全家桶中06其他】中的案例。
      . 方法一，直接使用H5推出的history身上的API
      . 方法二，hash值（类似锚点）
## React-router-dom 的理解   【v 77】 【需要自行下载】  
1. react的一个插件库  /  专门用来实现一个SPA应用  /  基于react的项目基本都会使用 
2. react-router库有三个版本： 【web***】 / 【native】  / 【any】
3. router  路由器  /  route  路由

## 路由的基本使用
1. 下载react-router-dom库，并且引入
2. 明确好界面中的导航区，展示区
3. 导航区的 a 标签改为 Link 标签 ———— <Link to= “/xxx”>Demo</Link>
4. 展示区写 Router 标签进行路径的匹配  ———— <Router path=“/xxx” element={<Demo/>}>
5. <App> 的最外侧包裹了一个 <BrowserRouter> 或者 <HashRouter>

## 路由组件 和 一般组件
1. 写法不同：
   . 一般组件： <Demo/>
   . 路由组件： <Route path ="/home" element ={<Home/>}/> 
2. 存放路径不同：
   . 一般组件放在component中
   . 路由组件应该放在pages文件夹中， 。
3. 接受props不同：
   . 一般组件如果没有传递，则没有数据。
   . 路由组件会收到路由器传递的三个最重要的props信息【history，location，match】
         history:
               go: f go()
               goBack: f goBack()
               goForward: f goForward()
               push: f push(path,state)
               replace: f replace(path,state)
      
         location:
               pathname: '/about'
               search:''
               state: undefined
      
         match:
               params: {}
               path:"/about"
               url:"/about"


## 细节——导航栏的高亮效果
1. NavLink 自带一个默认的active样式（高亮），负责给被点击的dom一个active的样式。
2. 如果想自定义导航栏的样式，需要在NavLink中通过 activeClassName = “style”，然后在css文件中可以另行设置。
3. 如果产品中也引用了bootstrap，则需要将自定义的样式级别加强  ！important

## MyNavLink 进行封装
1. 标签名作为标签体【位于标签之间的内容】，标签不为自闭合标签，为完整的标签。
2. 标签属性的数据使用props传送和接受。 但是，如何接受 【标签体数据】？  
3. App中的MyNavLink导航：<MyNavLink to="/about"> About </MyNavLink> ——标签体【About】其实也是一个特殊的标签属性， this.props.children可以获取组件标签体内容。
4. MyNavLink组件的封装：<NavLink className="list-group-item" {...this.props}/>  ——批量传递所有的props到封装组件，

## 六、Switch
1. 通常情况下，path和component是一一对应的关系。
2. 引入Switch，并用此标签将所有注册路由进行包裹。Switch 可以提高路由匹配效率（单一匹配）

## 七、样式丢失问题
1. 描述： 当在路径前加上公司名称，之后再次刷新网页，因为样式引入的路径的方式有多级结构问题，会导致网页样式丢失，只返回index.html。
2. 分析： 在react中，内置一个devServer【localhost：3000】，且根目录在public中。当在请求一些不存在的数据或资源时，react会返回根目录中的index.html，这样就导致网页只渲染这份文件。
3. 解决方案：
   . 修改index.html文件中的css引入路径，去掉css前面的【.】将相对路径改为绝对路径： <link rel="stylesheet" href="./css/bootstrap.css"> —— <link rel="stylesheet" href="/css/bootstrap.css">
   . 将css路径中的【.】替换为【%PUBLIC_URL%】 ： <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css"> 【此方法只使用react，其他框架不行】
   . 在index.js文件中，将BrowserRouter路由器改为HashRouter，因为会忽略 # 之后的路径内容，直接询问根目录public请求数据资源，这样可以正常获取。【此方法不常用】

## 八、路由的 模糊匹配 和 精准匹配
1. 模糊匹配：默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2. 精准匹配：<Route exact={true} path ="/home" component={Home}/> 或者 exact，默认属性是true。exact 不需要引入，可直接使用。
3. 使用原则：不要随便开启，需要在开，有时候开启会导致无法继续匹配二级路由。

## 九、Redirect 的使用
1. Redirect： 重定向，如果前面都没有匹配上，最后去Redirect指定的路径。
2. 需要在 react-router-dom 中引入，且放在Switch标签的内部最下方，也就是所有路由注册的最下方。
                  <Switch> 
                     <Route path ="/about" component={About}/>
                     <Route path ="/home" component={Home}/> 
                     <Redirect to="/about"/>
                  </Switch> 

## 十、 嵌套路由 = 多级路由
1. 注册子路由时，要写上父路由的path值。 <Route path="/home/news" component={News}/>
2. 路由的匹配先从App总组件注册的路由开始优先匹配。

## 十一、 向路由组件传递参数 , 使用频率依据以下顺序 ，都必须掌握。
1. params 参数
   . 路由链接（携带参数）：<Link to={`/demo/test/tom/18`}>详情</Link>
   . 注册路由（声明接受）：<Route path='/demo/test/:name/:age' component={Test}/>
   . 路由组件接受参数： const {name, age} = this.props.match.params

2. search 参数
   . 路由链接（携带参数）：<Link to={`/demo/test?name=tome&age=18`}>详情</Link>
   . 注册路由（无需声明，正常注册路由即可）：<Route path='/demo/test' component={Test}/>
   . 路由组件接受参数： const {search} =this.props.location 
                     const {id,title}= qs.parse(search.slice(1)) 
   . 备注： 获取到的search是 urlencoded编码字符串，需要借助引入的 querystring解析，且去处最前面的？。
           urlencoded 编码形式： key=value&key=value
                   let obj = {name:'tom',age:18} 
                   console.log(qs.stringify(obj))   // name=tom&age=18
                   let str = 'carName=Dazhong&price=20'
                   console.log(qs.parse(str))   // { carName: "Dazhong", price: "20" }

3. state 参数 【路由组件上独有的属性，并不是组件里的状态】 ———— 优点：url路径上面不显示，“隐形传递”
   . 路由链接（携带参数）：<Link to={{pathName:'demo/test',state:{name:'tom',age:'18'}}}>详情</Link>
   . 注册路由（无需声明，正常注册路由即可）：<Route path='/demo/test' component={Test}/>
   . 路由组件接受参数：const {name,age}=this.props.location.state
   . 备注： 刷新也保留参数。
   . 注意：提供 || {} 防止网页的历史记录被清除后（因为location是history上面的一个api），网页不报错误，而是返回空对象。

## 十二、 编程式路由导航 也就是 history 身上的 API
   . this.props.history.push() —— react默认开启push模式，简称压栈，就是新的历史记录压在最上面。
   . this.props.history.replace() ——是替代。也可以直接加在 LINK 中，replace={true}  或者  replace， 无需引入且写法和 exact 类似。
   . this.props.history.goBack() : 往后退一步
   . this.props.history.goorward() ： 往前进一步
   . this.props.history.go(n): n 为正几，则是前进几步历史记录， 为负，则是往后退几步历史记录。

2.  withRouter 【从react-router-dom中引入withRouter】
   . withRouter可以加工一个一般组件，使一般组件具备路由组件所特有的API
   . withRouter的返回值是一个新组件， export default withRouter(Header)

## 十三、BrowserRouter 和 HashRouter
1. 底层原理不同：
   . BrowserRouter: 使用的是 H5 的history API， 不兼容 IE9 及以下版本。 
   . HashRouter: 使用的是URL的哈希值。
2. path表现不同：
   . BrowserRouter 的路径中没有带 # ，例如： localhost：3000/demo/test
   . HashRouter 的路径中带 # ，例如： localhost：3000/#/demo/test
3. 刷新后对路由state参数的影响：
   . BrowserRouter 没有任何影响，因为state保存在history对象中。
   . HashRouter 刷新后会导致路由state参数的丢失 ！！！！
4. 备注：HashRouter 可以用于解决一些路径错误相关的问题，比如刷新后样式的丢失。


### 第六章 REACT UI 组件库

## 十四、 REACT UI 组件库  【V 94-96】 
1. material-ui ： 
2. ant-design（蚂蚁金服）
3. antd的高级配置【按需引入】，参考文件为antd的V3版本.
  . https://3x.ant.design/docs/react/use-with-create-react-app-cn
  . eject命令 暴露react的所有webpackage 
  . 最后把之前自己引入的完整样式删除！！！
4. antd的主题设置
  . https://3x.ant.design/docs/react/use-with-create-react-app-cn
  . 注意下载的npm包裹的版本，版本容易导致问题。

### 第七章 redux ———— 状态交互 和 状态管理  【V 97 - 126】
1. 专门做状态管理的 JS 库 （不是react插件库） 
2. 可以与react，angular，vue 等项目中，但基本与热阿词条配合使用居多。
3. 作用： 集中式管理react应用中多个组件【共享】的状态。
4. 使用情况：
   . 某个组件的状态，需要让其他组件可以随时拿到（共享）。
   . 一个组件需要改变另一个组件的状态（通信）。比如 B 组件通过 redux 收到 A 组件的状态，继而保管为自己的状态， A 就改变了 B 的状态。 
   . 总体原则，能不用旧不用，如果不用导致编程吃力则用。



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

## V 103-6 ——求和案例react-redux的基本使用 （视频笔记————需要多练习，是难点） 
1. 明确两个概念
   .UI组件：
   .容器组件：
2. 如何创建一个容器组件 —— 靠react-redux的connect函数
   connect(mapStateToProps,mapDispatchToProps)(UI组件)
   - mapStateToProps: 映射状态，返回值时一个对象。
   - mapDispatchToProps: 映射操作状态的方法，返回值时一个对象。
3. 备注1：容器组件中的store时靠props传进去的，而不是在容器组件中直接引入。
   备注2：mapDispatchToProps，可以是一个函数（一般写法），也可以是一个对象（API层级的优化写法）。

## V 107-8 ——react-redux的优化写法 (自学笔记)
1. 使用react-redux的优点一： 使用connectconnect()()函数建立的容器组件，可以成为UI组件和redux的桥梁。  mapStateToProps(),mapDispatchToProps() API层级的优化写法。
2. 使用react-redux的优点二： 容器组件由connect()()创建，它不需要在index.js中对父组件进行随时监听，可以直接去除。但是redux则是需要进行单独监听。
   // 引入store， 如果状态有所改变，在本文件中直接对整个APP组件进行监听+调用render。 不必在子组件中进行监听，且diffing算法，不会导致工作量巨大。
   // store.subscribe(() => {
   // 	ReactDOM.render(<App />, document.getElementById('root'));
   // });
3. 使用react-redux的优点三： 在index.js文件中，引入react-redux中的Provider方法，之间将store={store}快捷的传递给所有的容器组件，避免手动逐一传递。
      ReactDOM.render(
	      <Provider store={store}>
	      	<App />
	      </Provider>,
	      document.getElementById('root')
      );

4. 文件层面优化： 将容器组件和UI组件定义在一个文件中，整合在container中的容器组件中。

## V 108 ——react-redux的优化写法 （视频笔记）
1. 容器组件和UI组件的整合
2. 无需自己给容器组件传递store， 使用Provider统一传递。
3. 使用react-redux后不需要自己检测redux中的状态改变了，容器组件可以自动完成这个工作。
4. mapDispatchToProps也可以简单的写成一个对象。
5. 一个组件要和redux“打交道”要经过那几步？
   . 定义好一个UI组件  --- 不暴露
   . 引入connect()()生成一个容器组件，并暴露，写法如下：
      connect(
         state=>({key:value})    // 映射状态
         {key:xxxAction}         // 映射操作状态的方法
      )(UI组件)
   . 在UI组件中通过this.props.xxxx读取和操作状态。


## V 109-112 ——  求和案例react-redux数据共享（视频笔记）
1. 定义一个Person组件，和Count组件通过redux共享数据。
2. 为Person组件编写：reducer，action，配置constant常量。
3. 重点： Person的reducer和Count的Reducer要使用combineReducer进行合并。合并后的总状态是一个对象！！！
4. 交给store的是总erducer，最后注意在组件中取出状态的时候，记得“取到位”。
5. 【纯函数】--
   . 一类特别的函数，只要是同样的输入（实参），必定得到同样的输出（返回）
   .必须遵守以下一些约束
     . 不得改写参数数据
     . 不会产生任何副作用，例如网络请求，输入和输出设备。
     . 不能调用Date.now() 或 Math.random()等不纯方法。
   . redux中的reducer【必须---纯函数】


## V 113 —— react-redux 开发者工具的使用(火狐浏览器需要点击鼠标右键，谷歌浏览器则定在菜单栏中)
1. npm i redux-devtool-extension
2. store中进行配置：
      import { composeWithDevTools } from 'redux-devtools-extension';
      const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));

## V 114 —— 求和案例 react-redux 最终版
1. 所有变量的名字要规范，尽量触发对象的简写形式。
2. reducers文件中，编写index.js 专门用于汇总并暴露所有的reducer。

## V 115 —— 打包一个项目，此方法用于前端人员进行测试
1. npm run build  // 将所有的编码编译为纯js
2. npm install -g serve  // 下载serve包
3. serve -s build  // 以build文件为根目录进行发布环境的运行




## 1. setState

### setState更新状态的2种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



------



## 2. lazyLoad

### 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



## 3. Hooks

#### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

#### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



## 4. Fragment

### 使用

	<Fragment><Fragment>
	<></>

### 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

## 5. Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都用它的封装react插件



<hr/>


## 6. 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>
> 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据  ———— 因为PureComponent进行浅对比，如果是原来的对象，阀门永远会返回true。
	项目中一般使用PureComponent来优化



<hr/>


## 7. render props

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 



<hr/>

## 8. 错误边界

#### 理解：

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面【多应用于产品上线后，开发环境还是会直接告知开发人员。】

#### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

##### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```
## 9. 组件通信方式总结

#### 组件间的关系：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

#### 几种通信方式：

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.conText:
			生产者-消费者模式

#### 比较好的搭配方式：
		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)


