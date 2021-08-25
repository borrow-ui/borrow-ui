import React from 'react';

import { Title, Monospace, Text, Badge, SyntaxHighlight } from '@borrow-ui/ui';

import styles from './styles-styles.module.scss';

export function OverridesDemo() {
    return (
        <div className={styles['styles-showcase__component']}>
            <a name="overrides" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Overrides
                </Title>
            </a>
            <Text>
                To properly use variables, override them and use them in other SCSS files you can
                follow few steps.
            </Text>
            <ol>
                <li>
                    Create a new variable file in the project, i.e.{' '}
                    <Monospace>{'<root>'}/packages/website-next/styles/_vars.scss</Monospace>
                    with the following content:
                    <SyntaxHighlight language="scss" code={projectVarsScss} className="m-b-20" />
                </li>
                <li>
                    Then, import this file and the full styles in your project, i.e.{' '}
                    <Monospace>{'<root>'}/packages/website-next/styles/borrow-ui.scss</Monospace>
                    with the following content:
                    <SyntaxHighlight
                        className="m-b-20"
                        language="scss"
                        code={projectScss}
                        preProps={{ 'data-line': '2' }}
                    />
                </li>
                <li>
                    Finally, import the full file in JS i.e.{' '}
                    <Monospace>{'<root>'}/packages/website-next/_app.js</Monospace>:
                    <SyntaxHighlight
                        className="m-b-20"
                        language="jsx"
                        code={projectImport}
                        preProps={{ 'data-line': '5' }}
                    />
                </li>
                <li>
                    All the global SCSS files imported <i>after</i> will be able to use variables.
                    <br />
                    In module files, like {"Next's"} per-component SCSS files, you can import the
                    <Monospace>_vars.scss</Monospace> files created in point{' '}
                    <Badge color="accent" type="circular">
                        1
                    </Badge>
                    .
                </li>
            </ol>
        </div>
    );
}

let projectVarsScss = `// overrides here on top
$ui-font: 'poppins';
$ui-color-primary: red;

/* compiled vars file, use this if you are not developing
 * (you need to build, see next section) or if you
 * are using on an external project (not in the monorepo)
 */
@import '~@borrow-ui/ui/dist/vars';

/* development version, use this if you are developing and
 * want to see changes without building
 */
// @import '../../ui/src/style/vars/main';`;

let projectScss = `// variables file
@import './vars';

/* compiled full file, use this if you are not developing
 * (you need to build, see next section) or if you
 * are using on an external project (not in the monorepo)
 */
@import '@borrow-ui/ui/dist/ui.full.scss';

/* development version, use this if you are developing and
 * want to see changes without building
 */
// @import '../../ui/src/style/ui.full.scss';`;

let projectImport = `import React from 'react';
import Link from 'next/link';
import { setConfig } from '@borrow-ui/ui';

import '../styles/borrow-ui.scss';

import { Layout } from '../layout/Layout';

setConfig('getLinkComponent', () => Link);

function MyApp({ Component, pageProps }) {
    return <Layout Component={Component} pageProps={pageProps} />;
}

export default MyApp;`;
