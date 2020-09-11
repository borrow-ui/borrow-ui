import React, { Fragment } from 'react';

import { Block, Modal, Button, Lorem } from '@borrow-ui/ui';

export function Modals() {
    return (
        <Block>
            <Modal
                Trigger={({ setVisible }) => (
                    <Button onClick={() => setVisible(true)} className="m-r-10">
                        Open Modal
                    </Button>
                )}
                getModalWindowProps={({ setVisible }) => {
                    return {
                        title: 'Modal',
                        content: <LoremContent />,
                        footer: (
                            <Fragment>
                                <div>Left element</div>
                                <Button mean="primary" onClick={() => setVisible(false)}>
                                    Close
                                </Button>
                            </Fragment>
                        ),
                    };
                }}
            />
            <Modal
                Trigger={({ setVisible }) => (
                    <Button onClick={() => setVisible(true)} mean="primary">
                        Open Modal
                    </Button>
                )}
                getModalWindowProps={({ setVisible }) => {
                    return {
                        title: 'Something to work about',
                        content: <LoremContent />,
                        footer: (
                            <Fragment>
                                <div />
                                <div>
                                    <Button
                                        mean="positive"
                                        className="m-r-5"
                                        onClick={() => setVisible(false)}
                                    >
                                        Save
                                    </Button>
                                    <Button mean="negative" onClick={() => setVisible(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Fragment>
                        ),
                        hooks: {
                            onOpen: ({ resolve }) => {
                                setTimeout(() => {
                                    resolve();
                                }, 1500);
                            },
                        },
                    };
                }}
            />
        </Block>
    );
}

function LoremContent() {
    return (
        <div>
            <Lorem />
        </div>
    );
}
