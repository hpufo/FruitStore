var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');       //Node package

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/app.js",                         //Entry point of our app
  module: {                                     //module: For imports like loaders
    loaders: [
      {
        test: /\.jsx?$/,                              //test: regex for what files to transpile. Looks for js or jsx files
        exclude: /(node_modules|bower_components)/,   //exclude: dirs you don't want webpack to search for files to transpile
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    //__dirname from path, it is the current dir.
    path: __dirname + "/build/",    //path: where to put the output file
    filename: "app.min.js"        //Name of the output file
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
