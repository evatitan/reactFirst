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
