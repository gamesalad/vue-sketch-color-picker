const webpack = require('webpack'),
	path = require('path')

let srcDir = path.resolve(__dirname, '..', 'src')
module.exports = {
	entry: {
		'sketch-color-picker': path.join(srcDir, 'index.js')
	},

	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		publicPath: 'dist/',
		filename: "[name].js"
	},

	module: {
		noParse: /es6-promise\.js$/,
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},

			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},

			{
				test: /.sass|\.scss$/,
				loader: 'sass-loader'
			},

			{
				test: /\.js$/,
				exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
				loader: 'babel'
			}
		]
	},

	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	}
}
