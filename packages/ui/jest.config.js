module.exports = {
    transform: {
        '^.+\\.stories\\.jsx?$': '@storybook/addon-storyshots/injectFileName',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    },
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
