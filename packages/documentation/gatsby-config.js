module.exports = {
  plugins: [
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import "${__dirname}/../../ui/src/style/ui.full.scss";`,
      },
    },
  ],
};
