import React from 'react';

import { Title, ReferenceOverlay, Button, IconControl, Icon, Monospace } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function ReferenceOverlayDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="referenceoverlays" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Reference Overlays
                </Title>
            </a>
            <ImportStatement
                importStatement="import { ReferenceOverlay } from '@borrow-ui/ui';"
                docs="?path=/docs/components-referenceoverlay--default-story"
            />
            <p>
                Component used to create overlays (like tooltips) using{' '}
                <Monospace>popperjs</Monospace>
            </p>
            <div>
                <ReferenceOverlay overlayContent="This is a simple text" className="m-r-20">
                    <Button mean="positive">Hover me</Button>
                </ReferenceOverlay>
                <ReferenceOverlay
                    overlayContent="If you need help, read the docs!"
                    className="m-r-20"
                >
                    <Icon name="help" className="color-primary" />
                </ReferenceOverlay>
                <ReferenceOverlay
                    overlayContent={
                        <div
                            style={{
                                border: '1px solid #444',
                                padding: 5,
                                marginRight: 5,
                                backgroundColor: 'white',
                            }}
                        >
                            This should be shown on the right
                        </div>
                    }
                    className="m-r-20"
                    placement="right"
                >
                    <Button mean="primary-reverse">Right placed</Button>
                </ReferenceOverlay>

                <ReferenceOverlay
                    overlayContent="You must click the trigger or this message to close me!"
                    className="m-r-20"
                    placement="bottom"
                    triggerMode="click"
                >
                    <Button mean="primary-reverse">Click</Button>
                </ReferenceOverlay>
            </div>
        </div>
    );
}
