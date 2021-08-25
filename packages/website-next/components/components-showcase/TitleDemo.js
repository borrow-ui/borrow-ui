import React from 'react';

import { Title, Subtitle } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function TitleDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="titles" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Titles and Subtitles
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Title, Subtitle } from '@borrow-ui/ui';"
                docs="?path=/docs/components-typography-title--default-story"
            />
            <div>
                <Title>Title (default h1)</Title>
                <Subtitle>With a subtitle</Subtitle>
                <hr className={styles['components-showcase__separator-line']} />
                <Title tag="h2">Title h2</Title>
                <Subtitle>With a subtitle</Subtitle>
                <hr className={styles['components-showcase__separator-line']} />
                <Title tag="h3">Title h3</Title>
                <Subtitle>With a subtitle</Subtitle>
                <hr className={styles['components-showcase__separator-line']} />
                <Title tag="h4">Title h4</Title>
                <Subtitle>With a subtitle</Subtitle>
                <hr className={styles['components-showcase__separator-line']} />
                <Title tag="h5">Title h5</Title>
                <Subtitle>With a subtitle</Subtitle>
            </div>
        </div>
    );
}
