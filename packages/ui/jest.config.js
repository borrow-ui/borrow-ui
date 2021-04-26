module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    coverageReporters: ['text', 'html'],
};
