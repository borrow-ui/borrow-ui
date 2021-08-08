import React from 'react';

import { Title, Badge } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function BadgeDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="badges" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Badges
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Badge } from '@borrow-ui/ui';"
                docs="?path=/docs/components-badge--default-story"
            />
            <div>
                <Badge>Badge</Badge>
                <Badge color="primary">Badge</Badge>
                <Badge color="accent" type="squared">
                    Squared
                </Badge>
                <Badge color="positive" type="circular">
                    10
                </Badge>
                <Badge color="negative" onClick={() => window.alert('Error clicked')}>
                    Error (click)
                </Badge>
            </div>
        </div>
    );
}
