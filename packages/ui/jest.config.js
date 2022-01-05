module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/*.test.(ts|tsx)'],
    testPathIgnorePatterns: ['node_modules/'],
    testEnvironment: 'jsdom',
    moduleDirectories: ['src', 'node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
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
        '!src/**/PanelStory.js',
        '!src/**/SearchBarStory.js',
        '!src/**/TableStory.js',
        '!src/**/FormsStoryWrapper.js',
        '!src/**/forms/index.js',
        '!src/**/forms/constants.js',
    ],
};
