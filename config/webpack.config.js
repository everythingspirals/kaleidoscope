var path = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

//PostCSS Loader
var postCSSLoader = {
      test: /\.css$/,
      loader: "style-loader!css-loader!postcss-loader"
    };

//Babel Loader
var babelLoader = {
      test: /\.js/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
          presets: ['es2015', 'react', 'stage-2']
      }
    };

module.exports = {

    //Entry
    entry: './src/app/index.jsx',

    //Output
    output: {
        filename: './build/bundle.js'
    },

    //Loaders
    module: {
        loaders: [
          babelLoader,
          postCSSLoader
        ]
    },

    //Plugins
    plugins: [
      new CopyWebpackPlugin([
        {from: './src/public', to: './build'}
      ])
    ],

    //Dev Tools
    devtool: 'source-map',

    //Resolve
    resolve: {
     root: path.resolve('./src/app'),
     extensions: ['', '.js']
   }
}