module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleDirectories: ['src', 'node_modules'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './src/setupTests.js'],
    coverageReporters: ['text', 'html', 'lcov'],
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 90,
    //         lines: 90,
    //         statements: 80,
    //     },
    // },
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!dist/*',
        '!src/index.js',
        '!src/utils/types.js',
        '!src/**/*.stories.js',
        '!src/**/SearchBarStory.js',
    ],
};
