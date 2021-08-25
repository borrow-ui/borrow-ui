import React from 'react';

import { Title, Breadcrumbs } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function BreadcrumbsDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="breadcrumbs" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Breadcrumbs
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Breadcrumbs } from '@borrow-ui/ui';"
                docs="?path=/docs/components-breadcrumbs--default-story"
            />
            <div>
                <Breadcrumbs
                    breadcrumbs={[
                        { link: '/', label: 'Home', tag: 'a' },
                        { link: '/', label: 'Section', tag: 'a' },
                        { link: '/', label: 'Page', tag: 'a' },
                    ]}
                />
                <Title tag="h4" className="color-neutral-dark m-t-0">
                    Title after breadcrumbs
                </Title>
            </div>
        </div>
    );
}
