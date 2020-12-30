module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
