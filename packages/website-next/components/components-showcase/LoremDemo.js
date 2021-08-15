import React from 'react';

import { Title, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function LoremDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="lorem" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Lorem
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Lorem } from '@borrow-ui/ui';"
                docs="?path=/docs/components-lorem--default-story"
            />
            <div>
                <Lorem />
            </div>
        </div>
    );
}
