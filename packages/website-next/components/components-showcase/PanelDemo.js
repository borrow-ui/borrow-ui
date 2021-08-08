import React from 'react';

import { Title, Panel, Button, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function PanelDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="panels" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Panels
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Modal } from '@borrow-ui/ui';"
                docs="?path=/docs/components-modal--default-story"
            />
            <div>
                <Panel
                    Trigger={({ setVisible }) => (
                        <Button onClick={() => setVisible(true)} mean="primary">
                            Basic Panel
                        </Button>
                    )}
                    getPanelContentProps={() => ({
                        title: 'Panel demo title',
                        content: <Lorem paragraphs={3} />,
                    })}
                />
                <Panel
                    Trigger={({ setVisible }) => (
                        <Button onClick={() => setVisible(true)} mean="accent">
                            Header+Footer Panel
                        </Button>
                    )}
                    getPanelContentProps={({ setVisible }) => ({
                        title: <h3 className="color-accent">Custom title</h3>,
                        controls: (
                            <Button onClick={() => window.alert('clicked')} size="small">
                                Test
                            </Button>
                        ),
                        content: <Lorem paragraphs={3} />,
                        footer: (
                            <>
                                <Button onClick={() => setVisible(false)} mean="negative">
                                    Close
                                </Button>
                                <Button onClick={() => setVisible(false)} mean="positive">
                                    Save
                                </Button>
                            </>
                        ),
                    })}
                />
                <Panel
                    Trigger={({ setVisible }) => (
                        <Button onClick={() => setVisible(true)} mean="primary">
                            With onOpen hook
                        </Button>
                    )}
                    getPanelContentProps={() => ({
                        title: 'Panel demo title',
                        content: <Lorem paragraphs={3} />,
                        hooks: {
                            onOpen: ({ resolve }) => {
                                setTimeout(() => {
                                    resolve();
                                }, 1500);
                            },
                        },
                    })}
                />
            </div>
        </div>
    );
}
