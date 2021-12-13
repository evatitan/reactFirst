// 引入 lazy方法，然后使用lazy引入子组件。
import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Route } from 'react-router-dom';

//import Home from './Home/index';
//import About from './About/index';

import Loading from './Loading/index';
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

export default class Demo extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header">
							<h2>React Router Demo</h2>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							<NavLink className="list-group-item" to="/about">
								About
							</NavLink>
							<NavLink className="list-group-item" to="/home">
								Home
							</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 引入suspense方法，进行懒加载 , loading 是一个正常组件，正常引入*/}
								<Suspense fallback={<Loading />}>
									<Route path="/about" component={About} />
									<Route path="/home" component={Home} />
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
