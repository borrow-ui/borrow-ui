import React from 'react';

import { Title, Link } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function LinkDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="links" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Links
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Link } from '@borrow-ui/ui';"
                docs="?path=/docs/components-link--default-story"
            />
            <div>
                <Link tag="a">All the links</Link> of this website are using Link component!
            </div>
        </div>
    );
}
