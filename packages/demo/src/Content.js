import React from "react";

import { Block, Title, Text, Responsive } from "@borrow-ui/ui";

import { DemoComponents } from "./DemoComponents";
import "./content.css";

export function Content() {
  return (
    <Responsive>
      {(matches) => {
        const contentClassName = matches.small
          ? "content--small"
          : "content--normal";
        return (
          <div className={`content ${contentClassName}`}>
            <Block
              className="content__block"
              outstanding={true}
              contentCentered={true}
            >
              <div>
                <Title>Welcome to Demo Application</Title>
                <Text>
                  This demo app is used to check if build works correctly.
                </Text>
                <DemoComponents />
              </div>
            </Block>
          </div>
        );
      }}
    </Responsive>
  );
}
