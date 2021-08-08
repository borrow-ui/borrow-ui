import React from 'react';

import { Title, Tooltip, Button, Icon } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function TooltipDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="tooltips" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Tooltips
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Tooltip } from '@borrow-ui/ui';"
                docs="?path=/docs/components-tooltip--default-story"
            />
            <div style={{ fontSize: 14 }}>
                <Tooltip tooltip="This is a simple tooltip" className="m-r-20">
                    <Button mean="positive">Hover me!</Button>
                </Tooltip>
                <Tooltip tooltip="If you need help, read the docs!" className="m-r-20">
                    <Icon name="help" className="color-primary" />
                </Tooltip>
                <Tooltip
                    tooltip="This is a simple tooltip, shown on the right"
                    className="m-r-20"
                    placement="right"
                >
                    <Button mean="primary-reverse">Right placed</Button>
                </Tooltip>
                <Tooltip
                    tooltip="You must click the trigger or the message to close this tooltip!"
                    className="m-r-20"
                    placement="bottom"
                    triggerMode="click"
                >
                    <Button mean="primary-reverse">Click</Button>
                </Tooltip>
            </div>
        </div>
    );
}
