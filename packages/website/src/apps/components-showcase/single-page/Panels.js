import React, { Fragment } from 'react';

import { Panel, Button, Lorem } from '@borrow-ui/ui/lib';

export function Panels() {
    return (
        <div className="m-b-20">
            <h1>Panels</h1>
            <ContentPanel />
            <ContentPanelHook />
        </div>
    );
}

function ContentPanel() {
    return (
        <Panel
            Trigger={({ setVisible }) => (
                <Button onClick={() => setVisible(true)} className="m-r-5">
                    Open
                </Button>
            )}
            getPanelContentProps={({ setVisible }) => ({
                content: (
                    <div>
                        <Lorem paragraphs={3} />
                        <Lorem paragraphs={3} />
                        <Lorem paragraphs={3} />
                        <Lorem paragraphs={3} />
                    </div>
                ),
                title: 'Panel Demo',
                footer: (
                    <Fragment>
                        <div>This is the footer</div>
                        <div>
                            <Button
                                mean="primary"
                                className="m-r-10"
                                onClick={() => window.alert('Test')}
                            >
                                Test
                            </Button>
                            <Button mean="negative" onClick={() => setVisible(false)}>
                                Close
                            </Button>
                        </div>
                    </Fragment>
                ),
            })}
        />
    );
}

function ContentPanelHook() {
    return (
        <Panel
            Trigger={({ setVisible }) => (
                <Button mean="primary" onClick={() => setVisible(true)}>
                    Open
                </Button>
            )}
            getPanelContentProps={() => ({
                content: (
                    <div>
                        <Lorem paragraphs={3} />
                        <Lorem paragraphs={3} />
                    </div>
                ),
                title: 'Panel Demo With Hook',
                hooks: {
                    onOpen: ({ resolve }) => {
                        setTimeout(() => resolve(), 1500);
                    },
                },
            })}
        />
    );
}
