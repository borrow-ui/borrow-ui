import React from 'react';

import { Title, Monospace, Text, SyntaxHighlight } from '@borrow-ui/ui';

import { IconLink } from '../common/IconLink';

import styles from './styles-styles.module.scss';

export function BuildDemo() {
    return (
        <div className={styles['styles-showcase__component']}>
            <a name="build" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Build
                </Title>
            </a>
            <Text>
                SCSS files needs to be generated from the sparse variables and components files.
                <br />
                The <Monospace>{'<root>'}/packages/ui/styles/</Monospace> folder contains all
                non-components files. All variables files are imported into
                <Monospace>_main.scss</Monospace> file, which also has global variables definitions
                like background color, padding, font, etc.
            </Text>
            {/* TODO: insert NOTE here saying it's not required when including library in CRA */}
            <Text>
                When building the <Monospace>ui</Monospace> package, SCSS files needs to be:
                <ol>
                    <li>converted to CSS;</li>
                    <li>concatenated to generate one SCSS file (to override colors etc);</li>
                    <li>
                        generate variables files (to re-use them in components not built in the
                        library).
                    </li>
                </ol>
            </Text>
            Dependencies:
            <ul>
                <li>
                    <Monospace>SCSS</Monospace>: superset of SCSS
                    <IconLink href="https://sass-lang.com/" />
                </li>
            </ul>
            <Title tag="h3">1. Convert to CSS</Title>
            <Text>
                Converting SCSS to CSS can be done with the <Monospace>compile-css</Monospace> or
                <Monospace>compile-css-min</Monospace> commands.
                <SyntaxHighlight language="bash" code={compileScss} className="m-b-20" />
            </Text>
            <Title tag="h3">2. Concatenate SCSS file</Title>
            <Text>
                To generate one single SCSS file use the <Monospace>bundle-scss-all</Monospace>{' '}
                command.
                <br />
                This will generate a single file from all the styles and components.
                <SyntaxHighlight language="bash" code={bundleScss} className="m-b-20" />
            </Text>
            <Title tag="h3">3. Generate SCSS variables file</Title>
            <Text>
                To generate the SCSS file that contains only variables, use the{' '}
                <Monospace>bundle-scss-vars</Monospace> command.
                <SyntaxHighlight language="bash" code={bundleScssVars} className="m-b-20" />
            </Text>
        </div>
    );
}

let compileScss = `# from packages/ui folder:
yarn compile-css-min
# when developing, add --watch
# yarn-compile-css-min --watch
`;

let bundleScss = `# from packages/ui folder:
yarn bundle-scss-all
# when developing, add --watch
# yarn bundle-scss-all --watch
`;

let bundleScssVars = `# from packages/ui folder:
yarn bundle-scss-vars
# when developing, add --watch
# yarn bundle-scss-vars --watch
`;
