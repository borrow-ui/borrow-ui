const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' },
            },
            {
                test: /\.scss$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: { limit: 50000 },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.scss', '.js', '.json', '.png', '.gif', '.jpg', '.svg'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    output: {
        path: path.resolve(__dirname, 'lib/'),
        publicPath: '',
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        },
    },
};
