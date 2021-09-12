import React from 'react';

import { Title, Loader, Button } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function LoaderDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="loaders" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Loaders
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Loader } from '@borrow-ui/ui';"
                docs="?path=/docs/components-loader--default-story"
            />
            <div>
                <div className="flex-spacebetween-center flex--wrap">
                    <div>
                        <Loader />
                    </div>
                    <div>
                        <Loader type="line" />
                    </div>
                    <div className="">
                        <div>
                            Can be between <Loader type="inline" /> text
                        </div>
                        <div className="flex-center-center">
                            <Button disabled={true} mean="neutral-reverse">
                                <Loader type="inline" className="m-r-5" />
                                Loading
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
