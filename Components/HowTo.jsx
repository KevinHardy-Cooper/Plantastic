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

		// Check if any of the labels contain specific plant types
		for (var label in this.labels) {
			var descr = this.labels[label].description;

			if (descr === "cactus" || descr === "aloe" || descr === "bamboo" || descr === "orchid") {
				this.getSuggestion(descr);
				return;
			}
		}
	}

	getSuggestion(plantType) {

		// GET suggestion, returning the results in JSON format, then setting the state property suggestions to these results
		fetch('http://localhost:3000/suggestions/' + plantType)
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
					<h2> Suggestions available </h2>
					<h3> How to take care of a(n) {this.state.suggestions[0].plantType} </h3>
					<h4> Planting details </h4>
					<p> {this.state.suggestions[0].plantingDetails} </p>
					<h4> General Care </h4>
					<p> {this.state.suggestions[0].care} </p>
				</div>
			)
		}
	}
}