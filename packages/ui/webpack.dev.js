const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge.merge(common, {
    mode: 'development',
    devtool: 'source-map-eval',
    plugins: [new BundleAnalyzerPlugin()],
});
