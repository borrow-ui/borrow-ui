import React from "react";
import { theme, useConfig, ComponentsProvider } from "docz";

import { Styled, ThemeProvider } from "theme-ui";

import defaultTheme from "~theme";

import { customComponents } from "./customComponents";

import "gatsby-remark-vscode/styles.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "typeface-lato/index.css";
import "@borrow-ui/ui/style/ui.full.scss";
import "./docz.scss";

const themeConfig = {
  ...defaultTheme,
  showDarkModeSwitch: false,
};

// Update configuration by name
themeConfig.styles.root.fontSize = 2;
themeConfig.styles.root.fontFamily = "Lato";
themeConfig.prism.dark.plain.fontSize = 16;
themeConfig.prism.light.plain.fontSize = 16;

const Theme = ({ children }) => {
  const { themeConfig } = useConfig();
  return (
    <ThemeProvider theme={themeConfig}>
      <ComponentsProvider components={customComponents}>
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
    </ThemeProvider>
  );
};

export default theme(themeConfig)(Theme);
