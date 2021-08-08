import React from 'react';

import { Title, Tabs, Block, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function TabsDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="tabs" className="component-anchor">
                <Title tag="h2" className="color-accent">
                    Tabs
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Tabs } from '@borrow-ui/ui';"
                docs="?path=/docs/components-tab--default-story"
            />
            <div style={{ fontSize: 14 }}>
                <Tabs
                    tabs={[
                        {
                            label: 'First',
                            content: (
                                <Block>
                                    <h2>First</h2>
                                    <Lorem paragraphs={1} />
                                </Block>
                            ),
                        },
                        {
                            label: 'Default',
                            content: (
                                <Block>
                                    <h2>Default (Second)</h2>
                                    <Lorem paragraphs={2} />
                                </Block>
                            ),
                        },
                        {
                            label: 'Third',
                            content: (
                                <Block>
                                    <h2>Third</h2>
                                    <Lorem paragraphs={3} />
                                </Block>
                            ),
                        },
                    ]}
                    firstOpen={2}
                />
            </div>
        </div>
    );
}
