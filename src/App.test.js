import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { ERROR_MESSAGE } from './variables';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to return Enzyme ShallowComponent with props and state
 * @function setup
 * @param {ReactElement} Component - React component needed to setup shallow function for
 * @param {object} props - Component props specific for this setup
 * @param {any} state - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (Component, props = {}, state = null) => {
	const wrapper = shallow(<Component {...props} />);
	return state ? wrapper.setState(state) : wrapper;
};

/**
 * Return ShallowWrapper Node(s) with the given data-test value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Wrapper need to find 
 * @param {string} value - value used for finding Node(s) with data-test has the same value
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, value) => {
	return wrapper.find(`[data-test="${value}"]`);
};

test('render without error', () => {
	const wrapper = setup(App);
	const appComponent = findByTestAttr(wrapper, 'component-app');
	expect(appComponent.length).toBe(1);
});

test('render increment button', () => {
	const wrapper = setup(App);
	const button = findByTestAttr(wrapper, 'increment-button');
	expect(button.length).toBe(1);
});

test('render decrement button', () => {
	const wrapper = setup(App);
	const button = findByTestAttr(wrapper, 'decrement-button');
	expect(button.length).toBe(1);
});

test('render counter display', () => {
	const wrapper = setup(App);
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	expect(counterDisplay.length).toBe(1);
});

test('counter start at 0', () => {
	const wrapper = setup(App);
	const counter = wrapper.state('counter');
	expect(counter).toBe(0);
});

test('clicking increment button and show value in counter display', () => {
	const counter = 7;
	const wrapper = setup(App, null, { counter });

	//find increment button and simulate click
	const incrementButton = findByTestAttr(wrapper, 'increment-button');
	incrementButton.simulate('click');

	//find counter display and check it display increased counter
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking decrement button and show value in counter display', () => {
	const counter = 7;
	const wrapper = setup(App, null, { counter });

	//find decrement button and simulate clicking it
	const button = findByTestAttr(wrapper, 'decrement-button');
	button.simulate('click');

	//find counter display and check it display decremented counter
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	expect(counterDisplay.text()).toContain(counter - 1);
});

test('no count below zero', () => {
	const counter = 0;
	const wrapper = setup(App, null, { counter });

	//find decrement button and simulate clicking it
	const button = findByTestAttr(wrapper, 'decrement-button');
	button.simulate('click');

	//checking if it remain at not below zero
	expect(wrapper.state('counter')).toBe(counter);

	//expect to see error in screening
	const errorDisplay = findByTestAttr(wrapper, 'error-display');
	expect(errorDisplay.text()).toBe(ERROR_MESSAGE.belowZero);
});

test('no error below zero message when clicking increment button', () => {
	const counter = 0;
	const wrapper = setup(App, null, { counter });

	//find decrement button and simulate clicking it
	const decrementButton = findByTestAttr(wrapper, 'decrement-button');
	decrementButton.simulate('click');

	//find increment button and simulate clicking it
	const incrementButton = findByTestAttr(wrapper, 'increment-button');
	incrementButton.simulate('click');

	//find error display and making sure it has already removed below zero error message
	const errorDisplay = findByTestAttr(wrapper, 'error-display');
	expect(errorDisplay.text()).toBeFalsy();
});
