/*
  February 4, 2018
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the component that displays the "how to take care of the plant" section
*/

// Importing modules
import React from 'react';

export default class HowTo extends React.Component {

	// The constructor is called before a component is mounted on the DOM.  Props are the parameters that are passed into this component from the parent component
	constructor(props) {
		super(props);
		this.labels = this.props.labels;

		// Creating local state variables which will be used throughout the component lifecycle
    	this.state = {
      		suggestions: []
    	};
	}

	/*
    	componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	*/
	componentDidMount() {

		// GET suggestion, returning the results in JSON format, then setting the state property invoices to these results
		fetch('http://localhost:3000/suggestions/cactus')
			.then(results => {
				return results.json();
			})
			.then(data => {
				this.setState({suggestions: data});
		})
	}

	render() {

		if (this.state.suggestions.length == 0) {
			return (
				<div>
					<h2>No suggestions available for this plant</h2>
				</div>
			)
		} else {
			return (
				<div>
					<h2> Suggestion available </h2>
					<h3> How to take care of a {this.state.suggestions[0].plantType} </h3>
					<p> {this.state.suggestions[0].suggestion} </p>
				</div>
			)
		}
	}
}