export default {
  port: 3500,
  title: "borrow-ui docs",
  repository: "https://github.com/borrow-ui/borrow-ui",
  docgenConfig: {
    searchPatterns: ["../ui/**/*.js"],
  },
  filterComponents: (files) =>
    files.filter((filepath) => /\/[A-Z]\w*\.(js|jsx)$/.test(filepath)),
  files: ["**/*.docz.mdx", "../ui/**/*.docz.mdx"],
  ignore: ["../ui/node_modules"],
  menu: [
    "Introduction",
    "Getting Started",
    {
      name: "Project Structure",
      menu: ["Introduction", "UI Package", "Add a Component"],
    },
    "Typography",
    "Components",
    { name: "Forms", menu: ["Introduction", "Field", "Label"] },
  ],
};
