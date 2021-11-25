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

### 第四章：React ajax
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

### 第五章：React Router 【v 74-78】
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

## Switch
1. 通常情况下，path和component是一一对应的关系。
2. 引入Switch，并用此标签将所有注册路由进行包裹。Switch 可以提高路由匹配效率（单一匹配）

## 样式丢失问题
1. 描述： 当在路径前加上公司名称，之后再次刷新网页，因为样式引入的路径的方式有多级结构问题，会导致网页样式丢失，只返回index.html。
2. 分析： 在react中，内置一个devServer【localhost：3000】，且根目录在public中。当在请求一些不存在的数据或资源时，react会返回根目录中的index.html，这样就导致网页只渲染这份文件。
3. 解决方案：
   . 修改index.html文件中的css引入路径，去掉css前面的【.】将相对路径改为绝对路径： <link rel="stylesheet" href="./css/bootstrap.css"> —— <link rel="stylesheet" href="/css/bootstrap.css">
   . 将css路径中的【.】替换为【%PUBLIC_URL%】 ： <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css"> 【此方法只使用react，其他框架不行】
   . 在index.js文件中，将BrowserRouter路由器改为HashRouter，因为会忽略 # 之后的路径内容，直接询问根目录public请求数据资源，这样可以正常获取。【此方法不常用】

## 模糊匹配 和 精准匹配
1. 模糊匹配：默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2. 精准匹配：<Route exact={true} path ="/home" component={Home}/> 或者 exact，默认属性是true。exact 不需要引入，可直接使用。
3. 使用原则：不要随便开启，需要在开，有时候开启会导致无法继续匹配二级路由。

## Redirect
1. Redirect： 重定向，如果前面都没有匹配上，最后去Redirect指定的路径。
2. 需要在 react-router-dom 中引入，且放在Switch标签的内部最下方，也就是所有路由注册的最下方。
                  <Switch> 
                     <Route path ="/about" component={About}/>
                     <Route path ="/home" component={Home}/> 
                     <Redirect to="/about"/>
                  </Switch> 