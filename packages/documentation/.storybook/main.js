const maxAssetSize = 1024 * 1024;

module.exports = {
  stories: [
    "../stories/**/*.stories.@(js|mdx)",
    "../../ui/src/**/*.stories.@(js|mdx)",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/preset-scss",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    "@storybook/addon-essentials",
  ],
  webpackFinal: async (config) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        chunks: "all",
        minSize: 30 * 1024,
        maxSize: maxAssetSize,
      },
    };
    config.performance = {
      ...config.performance,
      maxAssetSize,
    };
    return config;
  },
};
