import React from 'react';

import { Title, Modal, Button, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function ModalDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="modals" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Modals
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Modal } from '@borrow-ui/ui';"
                docs="?path=/docs/components-modal--default-story"
            />
            <div>
                <Modal
                    Trigger={({ setVisible }) => (
                        <Button onClick={() => setVisible(true)} className="m-r-10">
                            Open Modal
                        </Button>
                    )}
                    getModalWindowProps={({ setVisible }) => {
                        return {
                            title: 'Modal',
                            content: (
                                <div className={styles['components-showcase__modal-content']}>
                                    <Lorem />
                                </div>
                            ),
                            footer: (
                                <>
                                    <div>Left element</div>
                                    <Button mean="primary" onClick={() => setVisible(false)}>
                                        Close
                                    </Button>
                                </>
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
                            content: (
                                <div className={styles['components-showcase__modal-content']}>
                                    <Lorem />
                                </div>
                            ),
                            footer: (
                                <>
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
                                </>
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
            </div>
        </div>
    );
}
