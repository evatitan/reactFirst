import React, { Component } from 'react';
import './App.css';
export default class App extends Component {
  
	componentDidMount() {
		let loading = document.querySelector('.loading');
		let letters = loading.textContent.split('');
		loading.textContent = '';
		letters.forEach((letter, i) => {
			let span = document.createElement('span');
			span.textContent = letter;
			span.style.animationDelay = `${i / 5}s`;
			loading.append(span);
		});

		// let loading = document.querySelector('.loading');
		// let letters = loading.textContent.split('');
		// loading.textContent = '';
		// letters.forEach((letter, i) => {
		// 	let span = document.createElement('span');
		// 	span.textContent = letter;
		// 	span.style.animationDelay = `${i / 5}s`;
		// 	loading.append(span);
		// });
	}

	render() {
		return <div class="loading">Loading</div>;
	}
}
