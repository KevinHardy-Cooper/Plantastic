/*
  February 2, 2018
  Created by Kevin Hardy-Cooper
  Abstract:
  This file contains the root component that is to be loaded into the DOM (Document Object Model)
*/

// Importing module
import React from 'react';

// Importing component
import Body from './Body.jsx';

// App component that will be the master parent component, exporting for use in main.js
export default class App extends React.Component {
   render() {
      return (
         <div>
            {/* This is where the title for the page will reside */}
            <ul>
              <li><a href = "/">Plantastic 🌿</a></li>
            </ul>

            {/* The Body component contains the work flow for the application */}
            <Body/>
         </div>
      );
   }
}