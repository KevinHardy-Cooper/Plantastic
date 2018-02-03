/*
  February 3, 2018
  Created by Kevin Hardy-Cooper
  Abstract:
  This file contains the REST API
*/

// Importing modules
var express = require('express');
var bodyParser = require('body-parser');
var SensitiveInfo = require('./SensitiveInfo');
var request = require('request');

// Creating an Express.js app
var app = express();

// Creating an instance of SensitiveInfo
const sensitiveInfo = new SensitiveInfo();

// Adding headers that allow for Cross-Origin Resource Sharing between port 8080 and 3000
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json());

// Listen to POST requests to /labels.
app.post('/labels', function(req, res) {

  // The url that we are going to hit
  var api_url = 'https://vision.googleapis.com/v1/images:annotate?key=';

  // Creating a pos request using the request module
  request.post(
    api_url + sensitiveInfo.api_key, // appending the api key to the url
    { json: // the body of the post that must be sent to the Google Cloud Vision API
      {
        "requests": [{
          "image": {
            "content": req.body.image
          },
          "features": [{
            "type": "LABEL_DETECTION",
            "maxResults": 20
          }]
        }]
      }
    },

    // A callback once the results have been retrieved
    function (error, response) {
      if (!error && response.statusCode == 200) {
        res.send(response);
      }
    }
)});

// Set up the express routing to occur on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});