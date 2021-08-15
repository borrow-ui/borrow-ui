import React from 'react';

import { Title, Monospace, Text, Link, SyntaxHighlight } from '@borrow-ui/ui';

import styles from './styles-styles.module.scss';

export function ImportDemo() {
    return (
        <div className={styles['styles-showcase__component']}>
            <a name="import" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Import
                </Title>
            </a>
            <Text>
                In the <Link href="/getting-started/getting-started">main guide</Link> styles are
                loaded via CSS, but it is also possible to include them directly via SCSS:
                <SyntaxHighlight code="import '@borrow-ui/ui/dist/ui.full.scss';" />
            </Text>
            <Text>
                All styles included after can also use all the available variables. Variables are
                defined in
                <Monospace>{'<root>'}/packages/ui/src/style/vars/_main.scss</Monospace> and includes
                colors and shadows.
                <br />
                Including directly those files however does not take into consideration any override
                done.
            </Text>
        </div>
    );
}
