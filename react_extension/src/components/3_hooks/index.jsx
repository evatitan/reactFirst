import React from 'react';
import ReactDOM from 'react-dom';

// 类组件
// class Demo extends React.Component {
// 	state = { count: 0 };
// 	myRef = React.createRef();

// 	add = () => {
// 		this.setState((state) => ({ count: state.count + 1 }));
// 	};

// 	unmount = () => {
// 		ReactDOM.unmountComponentAtNode(document.getElementById('root'));
// 	};

// 	show = () => {
// 		alert(this.myRef.current.value);
// 	};

// 	componentDidMount() {
// 		this.timer = setInterval(() => {
// 			this.setState((state) => ({ count: state.count + 1 }));
// 		}, 1000);
// 	}

// 	componentWillUnmount() {
// 		clearInterval(this.timer);
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<input type="text" ref={this.myRef} />
// 				<h2>Sum is ：{this.state.count}</h2>
// 				<button onClick={this.add}>+1</button>
// 				<button onClick={this.unmount}>unmount</button>
// 				<button onClick={this.show}>show</button>
// 			</div>
// 		);
// 	}
// }

function Demo() {
	// 此代码，react做了地层处理，此处的count被react保存，不会被之后函数的调用而覆盖。
	// 此处返回一个数组，第一个参数是状态，第二个参数是更新状态的方法
	const [ count, setCount ] = React.useState(0);
	const [ name, setName ] = React.useState('tom');
	// 和createRef类似
	const myRef = React.useRef();

	// 此方法【React.useEffect】作用相当于componentDidMount和 componentDidUpdate 和 componentWillUnmount生命钩子。
	// 数组用于检测，空数组-不监测任何东西，不写数组-监测所有。
	React.useEffect(() => {
		let timer = setInterval(() => {
			setCount((count) => count + 1);
		}, 2000);
		// React.useEffect如果有返回值，那么返回值是一个 componentWillUnmount 钩子，在此处删除定时器。
		return () => {
			clearInterval(timer);
		};
	}, []);

	function add() {
		// setCount(count + 1);
		setCount((count) => count + 1);
	}

	function unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'));
	}
	function show() {
		alert(myRef.current.value);
	}

	function change() {
		// setCount(count + 1);
		setName('jack');
	}

	return (
		<div>
			<input type="text" ref={myRef} />
			<h2>Sum is ：{count}</h2>
			<h2>{name}</h2>
			<button onClick={add}>+1</button>
			<button onClick={change}>{name}</button>
			<button onClick={unmount}>unmount</button>
			<button onClick={show}>show</button>
		</div>
	);
}

export default Demo;
