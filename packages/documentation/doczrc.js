export default {
  port: 3500,
  docgenConfig: {
    searchPath: "../",
    filterComponents: (files) => {
      return files.filter((filepath) => /\/[A-Z]\w*\.(js|jsx)$/.test(filepath));
    },
  },
  files: ["**/*.docz.mdx", "../ui/**/*.docz.mdx"],
  menu: [
    "Introduction",
    "Getting Started",
    { name: "Project Structure", menu: ["Introduction", "UI Package", "Add a Component"]
    "Typography",
    "Components",
    { name: "Forms", menu: ["Introduction", "Field", "Label"] },
  ],
};
