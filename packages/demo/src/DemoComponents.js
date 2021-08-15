import React from "react";

import { Button, Lorem, Modal, Panel, Title, Tooltip } from "@borrow-ui/ui";

export function DemoComponents() {
  return (
    <div>
      <Title tag="h3">Demo Components</Title>
      <div className="flex-center-center">
        <Tooltip tooltip="Can you see me?" className="m-r-10">
          <Button mean="neutral-reverse">Tooltip</Button>
        </Tooltip>
        <div className="m-r-10">
          <Panel
            Trigger={({ setVisible }) => (
              <Button onClick={() => setVisible(true)} mean="neutral-reverse">
                Panel
              </Button>
            )}
            getPanelContentProps={() => ({
              title: "Panel title",
              content: <Lorem paragraphs={3} />,
            })}
          />
          <Modal
            Trigger={({ setVisible }) => (
              <Button onClick={() => setVisible(true)} mean="neutral-reverse">
                Modal
              </Button>
            )}
            getModalWindowProps={({ setVisible }) => ({
              title: "Modal title",
              content: <Lorem paragraphs={3} />,
              footer: (
                <>
                  <span />
                  <Button
                    size="small"
                    mean="negative"
                    onClick={() => setVisible(false)}
                  >
                    Close
                  </Button>
                </>
              ),
            })}
          />
        </div>
      </div>
    </div>
  );
}
