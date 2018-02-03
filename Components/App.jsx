/*
  December 18, 2017
  Created by Kevin Hardy-Cooper
  Abstract:
  This file contains the root component that is to be loaded into the DOM
*/

// Importing module
import React from 'react';

// Importing components
import Labels from './Labels.jsx';

// App component that will be the master parent component, exporting for use in main.js
export default class App extends React.Component {
   render() {
      return (
         <div>
         hiii
            <Labels/>
         </div>
      );
   }
}