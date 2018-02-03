/*
  February 3, 2018
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the component that displays the results in a nice table
*/

// Importing modules
import React from 'react';

export default class Table extends React.Component {

	// The constructor is called before a component is mounted on the DOM.  Props are the parameters that are passed into this component from the parent component
	constructor(props) {
		super(props);
		this.labels = this.props.labels;
	}

	render() {

		return (
			<table className = "descriptions">
    			<thead>
    				<tr>
    					<th>Description</th>
    					<th>Score</th>
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
		)
	}
}