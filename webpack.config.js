/*
* This code is inspired by https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm
* Setting up a webpack entry point
* Output path is the place where bundled app will be served. 
* Setting development server to 8080 port
* Setting babel loaders to search for javascript files
*/

var config = {
   entry: './main.js',
	
   output: {
      path:'/',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;