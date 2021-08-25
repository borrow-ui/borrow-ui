import React from 'react';

import { Title, Text, Monospace, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function TextsDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="texts" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Texts
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Text, Monospace } from '@borrow-ui/ui';"
                docs="?path=/docs/components-typography-text--default-story"
            />
            <div>
                <Text>
                    <Monospace>text in monospace</Monospace>
                </Text>
                <Text>
                    Normal text:
                    <br />
                    <Lorem paragraphs={1} />
                </Text>
                <Text size="big">
                    Big text:
                    <br />
                    <Lorem paragraphs={1} />
                </Text>
                <Text size="small">
                    Small text:
                    <br />
                    <Lorem paragraphs={1} />
                </Text>
            </div>
        </div>
    );
}
