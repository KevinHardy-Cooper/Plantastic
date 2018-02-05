/*
  February 3, 2018
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the component that displays the uploaded image 
*/

// Importing modules
import React from 'react';

export default class Image extends React.Component {

	// The constructor is called before a component is mounted on the DOM.  Props are the parameters that are passed into this component from the parent component
	constructor(props) {

		// Referring to the parent component
		super(props);
		this.image_src = this.props.image;
	}

	render() {

		return (
			<div>
				{/* The JSX parser needs to interpret this image_src value and set it to the img src */}

				<img src = {this.image_src} alt = "Uploaded Image" width = "100%"/>
			</div>
		)
	}
}	