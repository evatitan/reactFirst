# 第一章：React 基础  【V1-7】
1. Use command "npm start" to execute react app.

### 1.1  介绍
```
   (1). 英文官网：https://react.org/
   (2). 中文官网：https://react.docschina.org/
   (3). 描述：用于动态构建用户界面的JavaScript库(只关注视图)
   (4). 高效：操作虚拟(virtual)DOM,使用DOM Diffing算法，最小化页面重绘。
```
### 1.2  相关js库
```
   (1). react.js        : React核心库
   (2). react-dom.js    : 提供操作DOM的react扩展库
   (3). babel.min.js    : 解析JSX语法代码转为JS代码的库
```
### 1.3  JSX语法
```
   (1). 全名： JavaScript XML，用于简化创建虚拟DOM。
   (2). 基本语法规则：
      1). 标签名任意，标签属性任意，本质是React.createElement()的语法糖。
      2). 遇到 < 开头的代码，以标签的语法解析：html同名标签转化为html同名元素，其他标签需要特别解析(如：大写字母会被解析为组件)。
      3). 遇到 { 开头的代码，以JS语法解析：标签中的js表达式必须要{}包含。
      4). 样式类名： className /  內联式样式：{{key："value"}},key遵守大驼峰写法  /  只能有一个根标签(闭合标签)
      5). 最终产生一个JS对象。
   (3). babel的作用：
      1). 浏览器不能直接解析JSX代码，需要babel转译为纯JS代码才能运行。
      2). 若使用JSX，需要加上type=“text/babel”，声明需要babel来处理。
   (4). 区分 【js语句（代码）】与【js表达式】
      1). js表达式会产生一个值，可以放在任何一个需要值的地方。如：a , a+b , demo(1) , arr.map() , function test () {}
      2). js语句（代码），控制代码走向：如：if () {} , for(){} , switch () {casa:...}
```

# 第二章：React面向组件编程 【V8-48】

### 2.1  基本理解和使用
```
   (1). 函数式组件：需要结合hooks才能使用属性state，ref。
         // 1. 创建函数式组件，首字母必须大写
         function MyComponent(){
           console.log(this)  // 此处的this是undefined， 因为babel编译后，开启“use strict”模式，禁止个人定义的函数中的this指向全局windom。
           return <h2>function component (for simple component)</h2>  // 函数必须有返回值
         } 
         // 2. 渲染组件到页面，React找到了MyComponent组件。发现组件是函数定义的，随后调用该函数并将返回的虚拟DOM转为真实DOM，最后呈现在页面。
         ReactDOM.render(<MyComponent/>,document.getElementById("test"))
            
   (2). 类式组件
         // 1. render方法在类的原型对象上，供实例使用，里面的this是组件的实例对象。
         class MyComponent extends React.Component {
            render(){
               console.log("render的this",this)
               return (
                   <h2>Class component</h2>
               )
            }
         }
         // 2. 渲染组件到页面
         ReactDOM.render(<MyComponent/>,document.getElementById('test'))

   (3). 组件三大核心属性 和 this
      1). state
         . 组件对象最重要的属性，值是对象(可以包含多个key—value组合)。
         . 组件被成为“状态机”，通过更新组件的state来更新对应的页面显示(重新渲染组件)。
         . 数据状态，不能直接修改或更新,借助this.setState({})进行一种合并（不是替换）更新。
      2). props
         . 每个组件对象都会有props(properties)属性。
         . 组件标签的所有属性都保存在props中。
         . 通过标签属性从组件外向组件内传递变化的数据。
            const p = {name:"EVa", sex:"girl", age:10}
            ReactDOM.render(<Person {...p}/> ,document.getElementById('test3'))
         . 注意：组件内部不要修改props数据。
         . 对props中的属性值进行类型限制和必要性限制(需要引入prop-types)：
               // 使用static给class实例本身添加属性。
               static propTypes ={
                   name:PropTypes.string.isRequired,  // 限制name为string，且必填。
                   sex:PropTypes.string,
                   age:PropTypes.number,
                   speak:PropTypes.func  // 限制speak为函数
               }
               // 指定默认的标签属性
               static defaultProps={
                   sex:"未知",
                   age:18
               }
         . 函数式组件中使用props：
               function Person(props){
                  const {name , sex, age} = props
                  return (
                          <ul>
                              <li>name：{name}</li>
                              <li>sex：{sex}</li>
                              <li>age：{age}</li>
                          </ul>
                      )
               }

      3). refs 与 事件处理
         . 字符串ref ： react可以自主把ref所处DOM节点收集到this.refs中，以便调用，此效率慢。
               showDateLeft = ()=>{
                  const {input1} = this.refs
                  alert(input1.value)
               }
                <input ref="input1" type="text"/>
         . 回调形式ref ： react不会自主收集DOM节点，略麻烦。
               *內联函数的方式：ref会被执行2次，第一次是传入参数null，然后第二次会传入参数DOM元素，略麻烦。
               showDateLeft = ()=>{
                  const {input1} = this  // 回调ref直接可以在实例自身上面获取input1的值（this），不需要this.refs。
                  alert(input1.value)
               }
               <input ref={c=> this.input1 = c} type="text"/>

               * class的绑定函数方式 ： 将回调函数放在了组件实例的自身上，避免上述內联式函数传入2次参数的问题。
               saveInput=(c)=>{
                   this.input1 = c;
                   console.log('@',c)
               }
               <input ref={this.saveInput} type="text"/>
         . createRef ： 专人专用， 利用createRef创建了一个容器，把当前ref所处的DOM节点（input），直接存储在容器中。
               myRef1 = React.createRef()
               showDateLeft = ()=>{
                  alert(this.myRef1.current.value)
               }
               <input ref={this.myRef1} type="text"/>
         . 事件处理 ： 当事件源和事件操作者本身一致时，使用event.target而非ref。
               showDateRight =(event)=>{
                  alert(event.target.value)
               }
               <input onBlur ={this.showDateRight} type="text"/>

      4). this
         . 组件中render方法中的他this为组件实例对象.
         . 组件自定义的方法中this为undefined，解决办法：
            - 标准写法： 通过函数对象的bind()强制绑定this
               * this.demo = this.changeWeather.bind(this)
            - 精简写法： 赋值语句+箭头函数.
               * 赋值语句：类原型主动给实例添加的一个属性，名是左边，值是右边，原型本身上没有(static可以为原型本身添加属性)，只是给实例添加的属性。
               * 箭头函数：箭头函数没有自己的this，如果在其内部使用this关键字，它会找其外围的this作为其函数的this值去使用。
               * showData=()=>{}
```
### 2.2  收集表单数据
```
   (1). 非受控组件(不受状态控制) ： 页面中所有输入类的DOM，数据被现用现取,不存入状态(state中)。
            handleSubmit =(event)=>{
               event.preventDefault() // ajax 的方法阻止表单的提交，但是数据依旧会被后台保管。
               const {username, password} = this
               alert(`Your username is : ${username.value}. You password is ${password.value}`)
            }

             render(){
                 return (
                     <form action="http://www.google.com" onSubmit={this.handleSubmit}>
                        Name:<input ref={c=>{this.username=c}} type="text" name="username"/> 
                        Possword:<input ref={c=>{this.password=c}} type="password" name="password"/>
                        <button>Login</button>
                     </form>
                  )
               }
            }

   (2). 受控组件(受状态控制，可避免过多ref的使用)： 页面中所有输入类的DOM，随着操作者每一步输入，数据即被传递到到状态(state)中，当需要使用的时候再进行提取。
            state={
               username:'',
               password:''
            }
            saveUsername=(event)=>{
               this.setState({username:event.target.value})
            }
            savePassword=(event)=>{
               this.setState({password:event.target.value})
            }
            handleSubmit =(event)=>{
               event.preventDefault() // ajax 的方法阻止表单的提交，但是数据依旧会被后台保管。
               const {username, password} = this.state
               alert(`Your username is : ${username}. You password is ${password}`)
            }
            <form action="http://www.google.com" onSubmit={this.handleSubmit}>
               Name:<input onChange ={this.saveUsername} type="text" name="username"/> 
               Possword:<input onChange={this.savePassword} type="password" name="password"/>
               <button>Login</button>
            </form>
```

### 2.3  高阶函数 和 函数的柯里化
```
   (1). 如果一个函数符合小面2个规范中的任何一个，那么就是高阶函数。
         1). 若A函数，接受的是一个函数，那么A就是高阶函数。
         2). 若A函数，调用的返回值依然是一个函数，那么A是高阶函数。
         3). Promise、setTimeout、arr.map()等等
   (2). 【函数的柯里化】： 通过函数调用继续返回函数的方式，实现多次接受参数最后统一处理的函数编码形式。
            // input的中的onChange的右边，函数saveFormData（高阶函数）被赋值一个参数，但是并没有将这个参数直接赋值给onChange，而是利用这个参数再次返回了一个函数（return），最后将这个内部函数赋值给onChange进行回调。* 注意：onChange最后必须被赋值一个函数，继而react进行调用。

            saveFormData=(dataType)=>{
               return (event)=>{
                  this.setState({[dataType]:event.target.value})
               }
            }
            <form action="http://www.google.com" onSubmit={this.handleSubmit}>
               Name:<input onChange={this.saveFormData('username')} type="text" name="username"/> 
               Possword:<input onChange={this.saveFormData('password')} type="password" name="password"/>
               <button>Login</button>
            </form>

   (3). 【非函数的柯里化】：
            saveFormData=(dataType,event)=>{
               this.setState({[dataType]:event.target.value})
            }
            <form action="http://www.google.com" onSubmit={this.handleSubmit}>
               Name:<input onChange={event=>this.saveFormData('username',event)} type="text" name="username"/> 
               Possword:<input onChange={event=>this.saveFormData('password',event)} type="password" name="password"/>
               <button>Login</button>
            </form>
```
### 2.4  组件生命周期
```
   (1).  旧生命周期
      【初始化阶段】——由ReactDOM.render()触发---初次渲染
         1. constructor()
         2. componentWillMount()
         3. render()
         4. componentDidMount()     =======> 常用，一般做一些初始化的事情，例如开启定时器，发送网络请求，订阅消息
      【更新阶段】——由组件内部的this.setState()或 父级组件render触发
         1. shouldComponentUpdate()   // 强制卸载不需要这一步， 使用his.forceUpdate()触发
         2. componentWillUpdate
         3. render()                =======> 常用
         4. componentDidUpdate()
      【卸载阶段】——由ReactDOM.unmountComponentAtNode()触发
         1.componentwillUnmount()   =======> 常用，一般做一些收尾的事情，例如关闭定时器，取消订阅消息
      
      1).componentWillDidMount 在组件挂载完毕的时候调用，通常设置一些页面一加载就执行的操作。
         componentWillDidMount(){
            this.timer=setInterval(() => {
            let {opacity}=this.state
            opacity -= 0.1
            if(opacity <= 0) opacity=1
            this.setState({opacity})
            }, 2000);
         }

   (2).  新生命周期
      1).static getDerivedStateFromProps(props,state){
            console.log('getDerivedStateFromProps', props ,state)
            return null  //return props
         }
      2).getSnapshotBeforeUpdate(){
             console.log('getSnapshotBeforeUpdate')
             // return null
             return "提交的快照数据"
         }

   (3). 其他点
      1). 清除定时器
            -componentWillUnmount(){
               clearInterval(this.timer)
            }
      2). 卸载组件
            -ReactDOM.unmountComponentAtNode(document.getElementById('root'))
      3). 强制更新数据但不改变状态
            -this.forceUpdate()
```

### 2.5  虚拟 DOM 与 DOM Diffing 算法
```
   (1). 关于 key 
      1） react/vue中的key有什么作用？（key的内部原理是什么？）
      2） 为什么遍历列表时，key最好不使用index？
            【1】  虚拟DOM中key的作用：
                1） 简单的说：key是虚拟DOM对象的标识，在更新显示时key起着及其重要的作用。
                2） 详细的说：当状态中的数据发生变化时，react根据【新数据】生成【新的虚拟DOM】，随后react进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
                     a.旧虚拟DOM中找到了与新虚拟DOM相同的key：
                           (1). 若虚拟DOM中内容没变，直接使用之前的真实DOM。
                           (2). 若虚拟DOM中内容变了，则在生成新的真实DOM，随后替换掉页面中之前的真实DOM。
                     b. 旧虚拟DOM中未找到与新虚拟DOM相同的key：
                           (1). 根据数据创建新的真实DOM，随后渲染页面。
            【2】 用index作为key可能会引发的问题：
                1） 若对数据进行：【逆序添加】【逆序删除】等破坏顺序操作： 会产生没有必要的真实DOM更新 ==>界面效果没有问题，但是效率低。
                2） 如果结构中还包括输入类的DOM（input，checkbox等）： 会产生错误DOM更新  ==> 界面有问题，信息错乱不对应。
                3） 注意！如果不存在对数据的逆序添加，逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。
            【3】开发中如何选择key？
                1） 最好使用每条数据的唯一标识作为key，比如id，手机号，身份证号等等。
                2） 如果确定只是简单的展示数据，用index也是可以。
```

# 第三章：React应用，基于脚手架  【V50-64】

### 3.1 todoList 案例
```
   (1). 拆分组件，实现静态组件，注意：className，style的写法。
   (2). 动态化初始列表，如何确定将数据放在哪个组件的state中。
      —— 某个组件使用：放在自身的state中
      —— 某些组件使用：放在他们共同的父组件state中（官方称此操作：状态提升）
   (3). 关于父子之间通信
      —— 【父亲组件】给【子组件】传递数据： 通过props传递
      —— 【子组件】给【父亲组件】传递数据： 通过props传递，要求父亲提前给子传递一个函数
   (4). 注意defaultChecked 和 checked 的区别，类似的还有： defaultValue 和 Value
   (5). 状态在哪里，操作状态的方法就在那里。
   (6). 引入nanoid， 二元函数。
```

# 第四章：React ajax 【V65-73】

### 4.1 常用ajax请求库
```
   (1). jQuery: 使用的是回调函数，5次即形成回调地狱,比较重，如果需要另外引入。
   (2). axios: 轻量级，封装XmlHttpRequest对象的ajax  / promise风格  / 有拦截器 / 可用在浏览器端和node服务器端.
   (3). fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请  / 老版本浏览器可能不支持
   (4). xhr（传统AJAX） ： window自带，但是封装设置较为繁琐，没有那么好用的api，也有回调地狱。(其他的库都是对xhr的封装)
``` 

### 4.2 axios 发送请求
```  
   (1). https://github.com/axios/axios 
   (2). axios.get(url).then(response=>{},error=>{})
           -getStudentData=()=>{
             axios.get('http://localhost:3000/api1/students').then(
                 response =>{console.log('success',response)},
                 error=>{console.log('error',error)}
               )
            }
   (3). 代理的设置
         1). 配置单一代理： 在package.json中追加如下配置： "proxy":"http://localhost:5000"
         2). 配置多个代理： 优点：可以配置多个代理，可以灵活的控制请求是否走代理。/  缺点：配置繁琐，前端请求资源时必须加前缀。 
               -在src下创建配置文件：src/setupProxy.js
               -编写setupProxy.js配置具体代理规则：
                  const proxy = require('http-proxy-middleware')
                  module.exports = function(app) {
                     app.use(
                        proxy('/api1', {                     //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
                           target: 'http://localhost:5000',  //配置转发目标地址(能返回数据的服务器地址)
                           changeOrigin: true,               //控制服务器接收到的请求头中host字段的值
                           /*
                           	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
                           	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
                           	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
                           */
                           pathRewrite: {'^/api1': ''}        //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
                           }),
                           proxy('/api2', { 
                           target: 'http://localhost:5001',
                           changeOrigin: true,
                           pathRewrite: {'^/api2': ''}
                          })
                        )
                  }
```

### 4.3 消息订阅——消息发布 （兄弟组件的沟通）
```
   (1). 学习链接：https://github.com/mroderick/PubSubJS， 引入pubsub-js： npm install pubsub-js --sa
   (2). 消息订阅：
            . this.token = PubSub.subscribe('myTopic',()=>{}) 
            . 保持myTopic一致。
            . 从其他组件获取相关消息。
            . 回调函数中可以对所获得的数据进行操作。
            
            . componentDidMount(){
                  this.token =PubSub.subscribe('keyWord',(msg,stateObj)=>{
                      this.setState(stateObj)
                  })
               }
   (3).消息发布：
            . PubSub.publish('myTopic',{data})
            . 保持myTopic一致。
            . 将data数据传给订阅者。

            . search=()=>{
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
   (4).取消订阅（如果相关组件被删除或者其他原因不在，需要取消订阅）
            . PubSub.unsubscribe(this.token), 此处要求给当初的订阅机制取名“this.token”。
            . componentWillUnmount中设置 ：

            . componentWillUnmount(){
                  PubSub.unsubscribe(this.token)
               }
```

### 4.4 github 用户搜索案例
```  
   (1). 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办？loading...
   (2). ES6小知识：解构赋值 + 重命名
         let obj = {a:{b:1}}
         const {a} = obj;      // 传统解构赋值
         const {a:{b} = obj;   // 连续解构赋值
         const {a:{b:value}};  // 连续解构赋值 + 重命名
         —— 先订阅，再发布（理解：如隔空对话）
         —— 使用于任意组件间通信
         —— 要在组件的 componentWillUnmount 中取消订阅
   (4). fetch 发送请求（“关注分离“的设计思想）
         try {
               const response = await fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`)
               const data = await response.json()
               PubSub.publish('search',{isLoading:false,users:data.items})
         } catch (error) {
               console.log(error)
               PubSub.publish('search',{isLoading:false,err:error.message})
         }
```

### 4.5 fetch 发送请求
```
(1). Fetch： windom自带，内置可直接用，使用【关注分离】原则。
   1). 不是第三方库，无需下载，有浏览器即可用。https://github.github.io/fetch/
   2). Promise风格，避免回调地狱。
   3). 可以使用async，await函数。
   4). fetch在老版本兼容性不是很好。
   5). 
      componentDidMount(){   // 订阅消息
        this.token=PubSub.subscribe('search',(_,stateObj)=>{
          this.setState(stateObj)
        })
      }
      componentWillUnmount(){  // 取消订阅
        PubSub.unsubscribe(this.token)
      }

      try {  // fetch发送请求获得数据
        const response = await fetch(`http://localhost:3000/api1/search/users2?q=${keyword}`)
        const data = await response.json()
        PubSub.publish('search',{isLoading:false,users:data.items})
      } catch (error) {
        console.log(error)
        PubSub.publish('search',{isLoading:false,err:error.message})
      }
```

# 第五章：React Router 【v 74-78】

### 5.1 SPA 和 路由
```
   (1). SPA
         1).单页web应用，点击页面中的链接不会刷新页面，只会做页面的局部更新。
         2).数据都需要通过ajax请求获取，并在前端异步展现。
   (2). 路由
         1).一个路由就是一个映射关系（key：Value），key为路径， value可能是function或component。
         2).路由分类：
               —— 后端路由：
                  . 理解：Value 是function，用来处理客户端提交的请求。
                  . 注册路由： router.get(path,function(req,res))。
                  . 工作过程： 当node接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据。
               —— 前端路由：
                  . 浏览器端路由：Value是component，用于展示页面内容。
                  . 注册路由：< Router path="/test",component = {Test}>。
                  . 工作过程；当浏览器path变为/test时，当前路由组件会显示Test组件。
               —— 前端路由工作原理:
                  . BOM history —— 前端路由的基石，见【全家桶中06其他，前端路由的基石】中的案例。
                  . 方法一，直接使用H5推出的history身上的API
                  . 方法二，hash值（类似锚点）
```
### 5.2 React-router-dom
```
   (1). React-router-dom 的理解   
         1). react的一个插件库  /  专门用来实现一个SPA应用  /  基于react的项目基本都会使用 
         2). react-router库有三个版本： 【web***】 / 【native】  / 【any】
         3). router  路由器  /  route  路由
         4). 相关API
             <BrowserRouter>
             <HashRouter>
             <Route>
             <Redirect>
             <Link>
             <NavLink>
             <Switch>
             history 对象
             match 对象
             withRouter 对象
   (2). 基本使用
         1). 下载并引入react-router-dom库 --- npm install --save react-router-dom
         2). 明确好界面中的导航区，展示区。
         3). 导航区的 a 标签改为 Link 标签 ———— <Link to= “/xxx”>Demo</Link>
         4). 展示区写 Router 标签进行路径的匹配  ———— <Router path=“/xxx” element={<Demo/>}>
         5). <App> 的最外侧包裹一个 <BrowserRouter> 或者 <HashRouter>
   (3). 路由组件 和 一般组件
         1). 写法不同：
            . 一般组件： <Demo/>
            . 路由组件： <Route path ="/home" element ={<Home/>}/> 
         2). 存放路径不同：
            . 一般组件放在component中
            . 路由组件放在pages文件夹中。
         3). 接受props不同：
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
   (4).样式丢失问题
         1). 描述： 当在路径前加上公司名称，之后再次刷新网页，因为样式引入的路径的方式有多级结构问题，会导致网页样式丢失，只返回index.html。
         2). 分析： 在react中，内置一个devServer【localhost：3000】，且根目录在public中。当在请求一些不存在的数据或资源时，react会返回根目录中的index.html，这样就导致网页只渲染这份文件。
         3). 解决方案：
               . 修改index.html文件中的css引入路径，去掉css前面的【.】将相对路径改为绝对路径： <link rel="stylesheet" href="/css/bootstrap.css">
               . 将css路径中的【.】替换为【%PUBLIC_URL%】 ： <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css"> 【此方法只使用react，其他框架不行】
               . 在index.js文件中，将BrowserRouter路由器改为HashRouter，因为会忽略 # 之后的路径内容，直接询问根目录public请求数据资源，这样可以正常获取。【此方法不常用】
   (5).exact 精准匹配
         1). 模糊匹配：默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
         2). 精准匹配：<Route exact={true} path ="/home" component={Home}/> 或者 exact，默认属性是true。exact 不需要引入，可直接使用。
         3). 使用原则：不要随便开启，需要在开，有时候开启会导致无法继续匹配二级路由。
   (6). 嵌套路由 = 多级路由
         1). 注册子路由时，要写上父路由的path值。 <Route path="/home/news" component={News}/>
         2). 路由的匹配先从App总组件注册的路由开始优先匹配。
   (7).NavLink (需引入)
         1). NavLink 自带一个默认的active样式（高亮），负责给被点击的dom一个active的样式。
         2). 如果想自定义导航栏的样式，需要在NavLink中通过 activeClassName = “style”，然后在css文件中可以另行设置。
         3). 如果项目中也引用了bootstrap，则需要将自定义的样式级别加强 ！important。
         4). 对NavLink进行封装为MyNavLink  
               * 标签名作为标签体【位于标签之间的内容】，标签不为自闭合标签，为完整的标签。
               * 标签属性的数据使用props传送和接受。 但是如何接受【标签体数据】-this.props.children可以获得。
               * App中的MyNavLink导航：<MyNavLink to="/about"> About </MyNavLink> ——标签体【About】其实也是一个特殊的标签属性， this.props.children可以获取组件标签体内容。
               * MyNavLink组件的封装：<NavLink className="list-group-item" {...this.props}/>  ——批量传递所有的props到封装组件，
   (8).Switch (需引入)
         1). 通常情况下，path和component是一一对应的关系。
         2). 引入Switch，并用此标签将所有注册路由进行包裹，Switch可以提高路由匹配效率（单一匹配）
   (9).Redirect (需引入)
         1). Redirect： 重定向，如果前面都没有匹配上，最后去Redirect指定的路径。
         2). 需要在 react-router-dom 中引入，且放在Switch标签的内部最下方，也就是所有路由注册的最下方。
                  <Switch> 
                     <Route path ="/about" component={About}/>
                     <Route path ="/home" component={Home}/> 
                     <Redirect to="/about"/>
                  </Switch> 
   (10). 向路由组件传递参数,使用频率依据以下顺序，都必须掌握。
         1). params 参数
            . 路由链接（携带参数）：<Link to={`/demo/test/tom/18`}>详情</Link>
            . 注册路由（声明接受）：<Route path='/demo/test/:name/:age' component={Test}/>
            . 路由组件接受参数： const {name, age} = this.props.match.params
         2). search 参数
            . 路由链接（携带参数）：<Link to={`/demo/test?name=tome&age=18`}>详情</Link>
            . 注册路由（无需声明，正常注册路由即可）：<Route path='/demo/test' component={Test}/>
            . 路由组件接受参数： const {search} =this.props.location 
                              const {id,title}= qs.parse(search.slice(1)) 
            . 备注：获取到的search是 urlencoded编码字符串，需要借助引入的 querystring解析，且去处最前面的？。
                    urlencoded 编码形式： key=value&key=value
                            let obj = {name:'tom',age:18} 
                            console.log(qs.stringify(obj))   // name=tom&age=18
                            let str = 'carName=Dazhong&price=20'
                            console.log(qs.parse(str))   // { carName: "Dazhong", price: "20" }
         3). state 参数 【路由组件上独有的属性，并不是组件里的状态】 ———— 优点：url路径上面不显示，“隐形传递”
            . 路由链接（携带参数）：<Link to={{pathName:'demo/test',state:{name:'tom',age:'18'}}}>详情</Link>
            . 注册路由（无需声明，正常注册路由即可）：<Route path='/demo/test' component={Test}/>
            . 路由组件接受参数：const {name,age}=this.props.location.state
            . 备注： 刷新也保留参数。
            . 注意：提供 || {} 防止网页的历史记录被清除后（因为location是history上面的一个api），网页不报错误，而是返回空对象。
***(11). history 的API - 编程式路由导航 
         1) . this.props.history.push() —— react默认开启push模式，简称压栈，就是新的历史记录压在最上面。
            . this.props.history.replace() ——是替代。也可以直接加在 LINK 中，replace={true}  或者  replace， 无需引入且写法和 exact 类似。
            . this.props.history.goBack() : 往后退一步
            . this.props.history.goorward() ： 往前进一步
            . this.props.history.go(n): n 为正几，则是前进几步历史记录， 为负，则是往后退几步历史记录。
         2).  withRouter 【从react-router-dom中引入withRouter】
            . withRouter可以加工一个一般组件，使一般组件具备路由组件所特有的API
            . withRouter的返回值是一个新组件， export default withRouter(Header)
   (12). BrowserRouter 和 HashRouter
         1). 底层原理不同：
            . BrowserRouter: 使用的是 H5 的history API， 不兼容 IE9 及以下版本。 
            . HashRouter: 使用的是URL的哈希值。
         2). path表现不同：
            . BrowserRouter 的路径中没有带 # ，例如： localhost：3000/demo/test
            . HashRouter 的路径中带 # ，例如： localhost：3000/#/demo/test
         3). 刷新后对路由state参数的影响：
            . BrowserRouter 没有任何影响，因为state保存在history对象中。
            . HashRouter 刷新后会导致路由state参数的丢失 ！！！！
         4). 备注：HashRouter 可以用于解决一些路径错误相关的问题，比如刷新后样式的丢失。
```

# 第六章 REACT UI 组件库 【V 94-96】 

### 6.1  REACT UI 组件库  
```
   (1). material-ui，bulma...
   (2). ant-design（蚂蚁金服）
   (3). antd的高级配置【按需引入】，参考文件为antd的V3版本.
         . https://3x.ant.design/docs/react/use-with-create-react-app-cn
         . eject命令 暴露react的所有webpackage 
         . 最后把之前自己引入的完整样式删除！！！
   (4). antd的主题设置
         . https://3x.ant.design/docs/react/use-with-create-react-app-cn
         . 注意下载的npm包裹的版本，版本容易导致问题。
```

# 第七章 redux ———— 状态交互 和 状态管理  【V 97 - 115】

### 7.1 redux 
```
   (1). 理解 (需引入redux)
            1). 专门做状态管理的 JS 库 （不是react插件库） 
            2). 可以与react，angular，vue 等项目中，但基本与react配合使用居多。
            3). 作用： 集中式管理react应用中多个组件【共享】的状态。
            4). 使用情况：
                  . 某个组件的状态，需要让其他组件可以随时拿到（共享）。
                  . 一个组件需要改变另一个组件的状态（通信）。比如 B 组件通过 redux 收到 A 组件的状态，继而保管为自己的状态， A 就改变了 B 的状态。 
                  . 总体原则，能不用旧不用，如果不用导致编程吃力则用。
            5). https://redux.js.org/  /  http://www.redux.org.cn/  /  https://github.com/reactjs/redux
            6). API 
                  .getState()
                  .dispatch()                 
   (2). redux精简版 - 求和案例 
            1). 去除Count组件自身的状态
            2). src下建立： 
                     - redux
                        -store.js
                        -count_reducer.js   // 自己根据功能需求写的函数，对状态数据进行操作，但是只负责维护状态，并不调用render。
            3). store.js:
               . 引入redux中的createStore 函数，创建一个store，  // import { createStore } from 'redux'; // import countReducer from './count_redux';
               . createStore调用时要传入一个为其服务的reducer。   // const store = createStore(countReducer)
               . 需要暴露store对象
            4). count_reducer.js:
               . reducer的本质时一个函数，接受：preState，action，返回加工后的状态。
               . reducer有2个作用：初始化状态，加工状态
               . reducer 被第一次调用时，是store自动触发的，
                       - 传递的是preState是undefined,
                       - 传递的action是；{type:'@@REDUX/INIT_2.e.4.s'}   
            5). *在总index.js中检测store中状态的改变，一旦发送改变重新渲染<App/>
                        - 在indexjs总文件中，使用 API 3 ———— 如果状态有所改变，在本文件中直接对整个APP组件进行监听+调用render。 不必在子组件中进行监听，且diffing算法，不会导致工作量巨大。
                           store.subscribe(() => {
            	               ReactDOM.render(<App />, document.getElementById('root'));
                           });
                 *在具体子组件中：
                        - 引入store, 使用它的API
                        - API 1 ： store.getState()  ———— 用于获取store中的数据状态，但是store中的数据状态，来自reducer。
                        - API 2 ： store.dispatch({type,data}) ———— 用于子组件给store传递action，此案例中是使用自己打包的action。
                        - API 3 ： store.subscribe(()=>{this.setState()}) ———— 用于在componentDidMount钩子中进行订阅和监听redux中store的数据状态，进而在子组件挂在完毕时，调用render更新DOM。
                备注：redux只负责管理状态，至于状态的改变驱动者页面的展示，需要自己写。
            
   (3). redux完整版 - 求和案例（打包action）
            1). 新增文件：
                     - count_action.js  专门用于创建action对象
                     - constant.js      放置由于编码疏忽写错的action中的type。
   (4). redux的异步 action - 求和案例 
            1). 同步action：action的值是一个OBJ{}
            2). 异步action : action的值是一个function(){}
            3). 明确： 延迟的动作不想交给组件自身，交给action。
            4). 何时需要异步action： 想要对状态进行操作，但是具体的数据靠异步任务返回。
            5). 具体编码： 
                      . npm i redux-thunk ，并配置在store中。
                      . 创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
                      . 异步任务有结果后，分发一个同步action区真正操作数据。
            6). 备注： 异步action不是必须要写的，完全可以自己等待异步任务的结果后在区分发同步action。 
```

### 7.2 react-redux 
```
   (1).基础
            1). react-redux 将所有的组件分为两类：【容器组件】【UI组件】，所有的【UI组件】都应该被包裹在【容器组件】中，父子关系交流借助 props。
            2). 【容器组件】和redux交流(在App组件中通过传递props的方式，而不是组件中自己引入)，可以随意使用redux的 API， 【UI组件】不可以使用。 
            3). 【容器组件】会给【UI组件】传递： 1). redux中所保存的状态。 2). 用于操作状态的方法 —— store.dispatch(action)
            4). 备注: 【容器组件】给【UI组件】传递：共享状态，操作状态的方法，均通过props传递。
            
   (2).react-redux的使用-求和案例 
            1). 明确两个概念
                  .UI组件：
                  .容器组件：
            2). 如何创建一个容器组件 —— 靠react-redux的connect函数
                  connect(mapStateToProps,mapDispatchToProps)(UI组件)
                  - mapStateToProps: 映射状态，返回值时一个对象。
                  - mapDispatchToProps: 映射操作状态的方法，返回值时一个对象。
            3). 备注1：容器组件中的store时靠props传进去的，而不是在容器组件中直接引入。
                备注2：mapDispatchToProps，可以是一个函数（一般写法），也可以是一个对象（API层级的优化写法）。

   (3).react-redux的优化写法-求和案例 
            1). 容器组件和UI组件的整合，整合在一个文件中。
            2). 无需自己给容器组件传递store， 使用Provider统一传递。
            3). 使用react-redux后不需要自己检测redux中的状态改变了，容器组件可以自动完成这个工作。
            4). mapDispatchToProps也可以简单的写成一个对象。
            5). 一个组件要和redux“打交道”要经过那几步？
                  . 定义好一个UI组件  --- 不暴露
                  . 引入connect()()生成一个容器组件，并暴露，写法如下：
                     connect(
                        state=>({key:value})    // 映射状态
                        {key:xxxAction}         // 映射操作状态的方法
                     )(UI组件)
                  . 在UI组件中通过this.props.xxxx读取和操作状态。
            6). 优点：
                  .优点一： 使用connectconnect()()函数建立的容器组件，可以成为UI组件和redux的桥梁。  mapStateToProps(),mapDispatchToProps() API层级的优化写法。
                  .优点二： 容器组件由connect()()创建，它不需要在index.js中对父组件进行随时监听，可以直接去除。但是redux则是需要进行单独监听。
                     // 引入store， 如果状态有所改变，在本文件中直接对整个APP组件进行监听+调用render。 不必在子组件中进行监听，且diffing算法，不会导致工作量巨大。
                     // store.subscribe(() => {
                     // 	ReactDOM.render(<App />, document.getElementById('root'));
                     // });
                  .优点三： 在index.js文件中，引入react-redux中的Provider方法，之间将store={store}快捷的传递给所有的容器组件，避免手动逐一传递。
                        ReactDOM.render(
                  	      <Provider store={store}>
                  	      	<App />
                  	      </Provider>,
                  	      document.getElementById('root')
                        );
                  .优点四： 文件层面优化： 将容器组件和UI组件定义在一个文件中，整合在container中的容器组件中。
   (4).react-redux数据共享-求和案例
            1). 定义一个Person组件，和Count组件通过redux共享数据。
            2). 为Person组件编写：reducer，action，配置constant常量。
            3). 重点： Person的reducer和Count的Reducer要使用combineReducer进行合并。合并后的总状态是一个对象！！！
            4). 交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。
            5). 【纯函数】
                     . 一类特别的函数，只要是同样的输入（实参），必定得到同样的输出（返回）
                     .必须遵守以下一些约束
                       . 不得改写参数数据
                       . 不会产生任何副作用，例如网络请求，输入和输出设备。
                       . 不能调用Date.now() 或 Math.random()等不纯方法。
                     . redux中的reducer【必须---纯函数】
   (5).react-redux 开发者工具的使用(火狐浏览器需要点击鼠标右键，谷歌浏览器则定在菜单栏中)
            1). npm i redux-devtool-extension
            2). store中进行配置：
                     import { composeWithDevTools } from 'redux-devtools-extension';
                     const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));
   (6).react-redux 最终版
            1). 所有变量的名字要规范，尽量触发对象的简写形式。
            2). reducers文件中，编写index.js 专门用于汇总并暴露所有的reducer。
   (7).打包一个项目，此方法用于前端人员进行测试
            1). npm run build  // 将所有的编码编译为纯js
            2). npm install -g serve  // 下载serve包
            3). serve -s build  // 以build文件为根目录进行发布环境的运行
```

# 第八章 扩展包  【V116 - 126】

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


