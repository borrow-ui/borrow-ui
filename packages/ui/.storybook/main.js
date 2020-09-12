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
};
