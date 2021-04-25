import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { themes } from "@storybook/theming";

import "!style-loader!css-loader!sass-loader!./scss-loader.scss";

export const parameters = {
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
