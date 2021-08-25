import React from 'react';

import { Title, Block, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function BlockDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="blocks" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Blocks
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Block } from '@borrow-ui/ui';"
                docs="?path=/docs/components-block--default-story"
            />
            <div>
                <Block outstanding={true}>
                    <Title tag="h3" className="color-positive">
                        This is an outstanding block
                    </Title>
                    <Lorem />
                </Block>
                <Block>
                    <Title tag="h3" className="color-positive">
                        This is a normal block
                    </Title>
                    <Lorem />
                </Block>
            </div>
        </div>
    );
}
