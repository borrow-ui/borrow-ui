const path = require("path");

exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        "@borrow-ui/ui": path.resolve(__dirname, "../../../packages/ui/src"),
      },
    },
  });
};
