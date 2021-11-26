import React,{Component} from "react";
//import 'antd/dist/antd.css'  // 此文件很大，加载了全部的antd组件样式，建议参考文档进行按需引入的高级配置
import {Button,DatePicker} from "antd";
import {WechatOutlined} from '@ant-design/icons'

export default class App extends Component {
  render() {
    return (
      <div>
        <button>BTN</button>
        
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Primary Button</Button>
        <Button type="dashed">Primary Button</Button>
        <Button type="link">Primary Button</Button>
        <Button type="text">Primary Button</Button>
        <Button type="default">Primary Button</Button>
        <WechatOutlined />
        <DatePicker />
      </div>

    );
  }
}

 