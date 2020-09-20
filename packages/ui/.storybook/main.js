async function popperWorkaround(config) {
    config.module.rules = [
        {
            test: /\.js$/,
            loader: 'string-replace-loader',
            options: {
                search: "from 'react-popper'",
                replace: "from 'react-popper-storybook'",
            },
        },
        ...config.module.rules,
    ];

    return config;
}

module.exports = {
    stories: ['../stories/**/*.stories.@(js|mdx)', '../src/**/*.stories.@(js|mdx)'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-storysource',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null,
            },
        },
    ],
    webpackFinal: popperWorkaround,
};
