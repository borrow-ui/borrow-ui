import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { themes } from "@storybook/theming";

import prettier from "prettier/standalone";
import prettierBabel from "prettier/parser-babel";

import "!style-loader!css-loader!sass-loader!./scss-loader.scss";

export const parameters = {
  /*
  Workaround to make indentation work, waiting for a proper fix
  https://github.com/storybookjs/storybook/issues/8078
  */
  docs: {
    transformSource: (input) =>
      prettier.format(input, {
        parser: "babel",
        plugins: [prettierBabel],
      }),
  },
  previewTabs: { "storybook/docs/panel": { index: -1 } },
  options: {
    storySort: {
      order: [
        "Getting Started",
        "Project Structure",
        "Components",
        "Forms",
        ["Introduction", "Field", "Label", "Components"],
        "Hooks",
        ["Components"],
        "Project",
      ],
    },
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  viewMode: "docs",
};
