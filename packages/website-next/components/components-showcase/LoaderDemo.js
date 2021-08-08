import React from 'react';

import { Title, Loader, Button } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function LoaderDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="loaders" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Loaders
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Loader } from '@borrow-ui/ui';"
                docs="?path=/docs/components-loader--default-story"
            />
            <div>
                <div className="flex-spacebetween-center flex--wrap">
                    <div className="w-300">
                        <Loader />
                    </div>
                    <div className="w-300">
                        <Loader type="inline" className="m-r-10" />
                        <Button disabled={true} mean="regular-reverse">
                            <Loader type="inline" />
                            Loading
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
