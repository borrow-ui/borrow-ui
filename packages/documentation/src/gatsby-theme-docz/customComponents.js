import React from "react";

import components from "~components";

import { Title, Text, Table, Monospace } from "@borrow-ui/ui";

function generateTitle(tag) {
  return ({ children, ...rest }) => (
    <Title tag={tag} {...rest}>
      {children}
    </Title>
  );
}

function Paragraph({ children, ...rest }) {
  return (
    <Text className="m-t-0" {...rest}>
      {children}
    </Text>
  );
}

function Props({ children, props, ...rest }) {
  const entries = Object.keys(props).map((name) => {
    const prop = props[name];
    return {
      name,
      type_name: prop.type.name,
      type_raw: prop.type.raw,
      default_value: prop.defaultValue && (
        <Monospace>{prop.defaultValue.value}</Monospace>
      ),
      description: prop.description && (
        <div>
          {prop.description.map((block, i) => (
            <div key={i}>{block}</div>
          ))}
        </div>
      ),
    };
  });
  const columns = [
    { prop: "name", title: "Name" },
    { prop: "type_name", title: "Type" },
    { prop: "default_value", title: "Default" },
    { prop: "description", title: "Description" },
  ];
  return (
    <Table
      columns={columns}
      entries={entries}
      searchBar={{ visible: entries.length >= 10 }}
      statusBar={{ visible: false }}
      pagination={{ pageSize: 0 }}
      config={{ verticalAlign: "top" }}
    />
  );
}

export const customComponents = {
  ...components,

  // Custom generated components
  h1: generateTitle("h1"),
  h2: generateTitle("h2"),
  h3: generateTitle("h3"),
  h4: generateTitle("h4"),
  h5: generateTitle("h5"),
  h6: generateTitle("h6"),
  hr: () => <hr className="docz-hr" />,
  p: Paragraph,
  props: Props,
  inlineCode: Monospace,
};
