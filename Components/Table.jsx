/*
  February 3, 2018
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the component that displays the results in a nice table
*/

// Importing modules
import React from 'react';
import HowTo from './HowTo.jsx';

export default class Table extends React.Component {

	// The constructor is called before a component is mounted on the DOM.  Props are the parameters that are passed into this component from the parent component
	constructor(props) {
		super(props);
		this.labels = this.props.labels;
	}

	render() {

		// Check if any of the labels contain the word "plant", if not, then the picture is not of a plant and don't display table
		var plantCount = 0;
		for (var label in this.labels) {
			if (this.labels[label].description === "plant") {
				plantCount++;
			}
		}

		// If there are no labels containing the word plant, then it can be inferred that the image is not of a plant
		if (plantCount == 0) {
			return (
				<div>
					<h1>Not a plant!</h1>
				</div>
			)
		} else {
			return (
				<div>
					<table className = "descriptions">
		    			<thead>
		    				<tr>
		    					<th>Description</th>
		    					<th>Accuracy Score</th>
		    				</tr>
		    			</thead>
		    			<tbody>
			            	{/* For each label in labels, map each to a table row given an index key, and output the label info in table cells */}
			          		{
			              		this.labels.map(
			              			function(label, index) {
			                			return (
			                				<tr key = {index}>
			                          			<td>{ label.description }</td>
			                          			<td>{ label.score }</td>
			                       			</tr>
			                       		);
			              			}
			      				)
			          		}
			          	</tbody>
		            </table>
		        	<HowTo labels = {this.labels}/>
				</div>
			)
		}	
	}
}