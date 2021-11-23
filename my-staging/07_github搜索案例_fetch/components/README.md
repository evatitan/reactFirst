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
 . 
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