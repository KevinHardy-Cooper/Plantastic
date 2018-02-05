/*
  February 2, 2018
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the work flow for uploading the image
*/

// Importing modules
import React from 'react';
import { ClipLoader } from 'react-spinners'; // nice loading

// This is a nice react module that returns a Base64 encoded string from the image that is uploaded
import FileBase64 from 'react-file-base64'; 

// Importing components that are to be nested within this component
import Image from './Image.jsx';
import Table from './Table.jsx';

export default class Body extends React.Component {

	// The constructor is called before a component is mounted on the DOM
	constructor() {
		super();

		// Creating local state variables which will be used throughout the component lifecycle
    	this.state = {
      		labels: [],
      		image_src: "",
      		loading: false
    	};

    	// This binding is necessary to make 'this' work in the callback
    	this.getImage = this.getImage.bind(this);
    	this.getLabels = this.getLabels.bind(this);
  	}

	// Function that is called when image is uploaded
	// Input: uploaded file
	getImage(file){


		// The node backend cannot handle large base64 encoded pictures being posted in the request body, so checking for a valid picture size before doing anything else
		var pic_size = parseInt(file[0].size.substring(0, file[0].size.length-3));

		if (pic_size > 75) {
			alert("Picture size is too large!");
			return;
		}


		// Setting local state of the image source when base64 encoded
	    this.setState({image_src: file[0].base64});

	    // Massaging data aka splitting after the comma to retrieve the base64 encoded string
	    var strArr = this.state.image_src.split(",");
	    var base64_string = strArr[1];

	    // Calling getLabels, which will make the API call
	    this.getLabels(base64_string);
	}
   
	// Function that makes the REST API call
	// Input: base64 encoded string that represents an uploaded image
	getLabels(base64_string) {

		// Start Loader
		this.setState({loading: true});

		// Fetch provides an easy, logical way to fetch resources asynchronously across the network
		// Posts base64 encoded image to REST API
		fetch("http://localhost:3000/labels", 
			{
		    	method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"image": base64_string
				})
			})
		// On return of results, return the response as a json which contains the headers of the response but not the body
		.then((response) => { 
			return response.json();
		})

		// Now we can get the body of the response
		.then((data) => { 

			// Set sate variable labels with results from API call
			this.setState({labels: data.body.responses[0].labelAnnotations});  

			// Stop Loader
			this.setState({loading: false});
		});
	}


  	render() {

  		// Storing state in local variable
		var labels = this.state.labels;

		// Allocating the nice loader to a local variable
		let loader = null;

		// loader is only displayed when the state variable is set to true
		loader = <ClipLoader color = {'green'} loading = {this.state.loading} />;

		// If the array containing labels is empty
	  	if (labels.length == 0) {
		  	
		  	// Provide input button for file upload, and loading icon
		    return (
	    		<div className = "align-middle">
	    				<label><h2>
	    					Upload a picture of a plant!
	    					<br/>
	    					<FileBase64 multiple={ true } onDone={ this.getImage.bind(this) } />
	    				</h2></label>
	    			<div className = 'sweet-loading'>
				        {loader}
      				</div>
	    		</div>
	    	)
		} else {

			// Displaying Image and Table components
	    	return (
	    		<div>	    			
					{/* The nested component Image is to be rendered here, and is passed the encoded base64 image string */}
	    			<Image image={this.state.image_src}/>

	    			{/* The nested component Table is to be rendered here, and is passed array of labels */}
	    			<Table labels = {labels}/>
	            </div>
	    	);
	    }
    }
}