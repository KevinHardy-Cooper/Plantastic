/*
  February 4, 2018
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the component that displays the "how to take care of the plant" section
*/

// Importing modules
import React from 'react';
import { ClipLoader } from 'react-spinners'; // nice loading

export default class HowTo extends React.Component {

	// The constructor is called before a component is mounted on the DOM.  Props are the parameters that are passed into this component from the parent component
	constructor(props) {

		// Referring to the parent component
		super(props);
		this.labels = this.props.labels;

		// Creating local state variables which will be used throughout the component lifecycle
    	this.state = {
      		suggestions: [], // this will hold the details regarding the "how to take care of the plant"
      		loading: false	// this will represent if the nice loader is visible or not
    	};

    	// This binding is necessary to make 'this' work in the callback
    	this.validPlantType = this.validPlantType.bind(this);
    	this.getSuggestion = this.getSuggestion.bind(this);
	}

	/*
    	componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	*/
	componentDidMount() {

		// Check if any of the labels contain specific plant types
		for (var label in this.labels) {
			var descr = this.labels[label].description;

			// If the image label is a type of plant that can be switched on, then get "how to" from the database for that plant type
			if (this.validPlantType(descr) != "none") {
				this.getSuggestion(descr);
				return;
			}
		}
	}

	// Function that is used to determine if plant type is one that is stored in the database
	// Input: String representing the plant type
	validPlantType(plantStr) {
		switch(plantStr) {
			case "cactus":
				break;
			case "aloe":
				break;
			case "bamboo":
				break;
			case "orchid":
				break;
			default:
				return "none"; // use "none" to signify that plant type is not valid
		}
		return plantStr;
	}

	// Function gets the suggestion pertaining to the plant type from the database
	// Input: String representing the plant type 
	getSuggestion(plantType) {

		// Start Loader
		this.setState({loading: true});

		// GET suggestion, returning the results in JSON format, then setting the state property suggestions to these results
		fetch('http://localhost:3000/suggestions/' + plantType)
			.then(results => {
				return results.json();
			})
			.then(data => {
				this.setState({suggestions: data});
				
				// Stop Loader
				this.setState({loading: false});
			}
		)
	}

	render() {

		// Allocating the nice loader to a local variable
		let loader = null;

		// loader is only displayed when the state variable is set to true
		loader = <ClipLoader color = {'green'} loading = {this.state.loading} />;

		// If the arrray containing the suggestions is empty
		if (this.state.suggestions.length == 0) {
			return (
				<div>
					<h2>No suggestions available for this plant</h2>
				
					{/* The nice loader */}
					<div className = 'sweet-loading'>
				        {loader}
	  				</div>
  				</div>
			)
		} else {
			return (
				<div>

					
					<h2> Suggestions available </h2>

					{/* The JSX parser needs to interpret these suggestions value and display it */}

					<h3> How to take care of {this.state.suggestions[0].plantType} </h3>
					<h4> Planting details </h4>
					<p> {this.state.suggestions[0].plantingDetails} </p>
					<h4> General Care </h4>
					<p> {this.state.suggestions[0].care} </p>
				</div>
			)
		}
	}
}