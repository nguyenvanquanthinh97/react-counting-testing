import React from 'react';

import './App.css';
import { ERROR_MESSAGE } from './variables';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { counter: 0, error: null };
	}

	onDecrementButtonClick = () => {
		const { counter } = this.state;

		//prevent from decreasing counter to below 0
		if (counter === 0) {
			this.setState({ error: ERROR_MESSAGE.belowZero });
			return;
		}

		this.setState({ counter: counter - 1 });
	};

	onIncrementButtonClick = () => {
		const { counter, error } = this.state;

		this.setState({ counter: counter + 1, error: null });
	};

	render() {
		const { counter, error } = this.state;

		return (
			<div className="App" data-test="component-app">
				<h1 data-test="counter-display">The counter is {counter}</h1>
				<h3 data-test="error-display" className="error">
					{error}
				</h3>
				<button className="button" onClick={this.onDecrementButtonClick} data-test="decrement-button">
					Decrement Button
				</button>
				<button className="button" onClick={this.onIncrementButtonClick} data-test="increment-button">
					Increment Button
				</button>
			</div>
		);
	}
}

export default App;
