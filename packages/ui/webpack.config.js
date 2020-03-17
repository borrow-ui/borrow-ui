const path = require('path');

module.exports = {
    entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader', },
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.(png|gif|jpg|svg)$/,
				use: {
					loader: 'url-loader',
					options: { limit: 50000, },
				},
			},
		],
	},
	resolve: {
        extensions: ['.scss', '.js', '.json', '.png', '.gif', '.jpg', '.svg'],
        alias: {
            style: path.resolve(__dirname, 'src', 'style')
        }
	},
	output: {
		path: path.resolve(__dirname, 'lib/'),
		publicPath: '',
		filename: 'index.js',
		libraryTarget: 'umd',
	},
};