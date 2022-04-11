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
        'src/**/*.{js,ts,tsx}',
        '!dist/*',
        '!src/index.ts',
        '!src/**/*.types.ts',
        '!src/**/*.types.d.ts',
        '!src/**/*.stories.tsx',
        '!src/utils/propTypes.js',
        '!src/utils/sharedTypes.ts',
        '!src/**/TableStory.tsx',
        '!src/**/FormsStoryWrapper.tsx',
        '!src/**/forms/index.ts',
        '!src/**/forms/constants.ts',
    ],
};
