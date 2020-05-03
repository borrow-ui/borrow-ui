const path = require('path');

module.exports = ({ config }) => {
    config.resolve.modules.push(path.resolve(__dirname, '../src'));

    config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
    });

    return config;
};
