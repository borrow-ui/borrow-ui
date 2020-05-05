const path = require('path');
const merge = require('webpack-merge');

const maxAssetSize = 1024 * 1024;

module.exports = ({ config }) => {
    config.resolve.modules.push(path.resolve(__dirname, '../src'));

    config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
    });

    const split = {
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 30 * 1024,
                maxSize: maxAssetSize,
            },
        },
        performance: {
            maxAssetSize: maxAssetSize,
        },
    };

    return merge(config, split);
};
