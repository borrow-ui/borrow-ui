module.exports = {
    reactStrictMode: true,
    target: 'serverless',
    env: {
        STORYBOOK_BASE_URL: process.env.STORYBOOK_BASE_URL,
    },
};
