import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Block, Row, Col, Monospace, Text, Title, Link, SyntaxHighlight } from '@borrow-ui/ui';

export function ComponentExample({ isSmallScreen }) {
    const [isOutstanding, setIsOutstanding] = useState(true);
    useEffect(() => {
        setIsOutstanding(!isSmallScreen);
    }, [isSmallScreen]);

    return (
        <Block outstanding={isOutstanding}>
            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                Example - Link component
            </Title>
            <Row>
                <Col colClassName="col-sm-12 col-md-6">
                    <div style={{ display: 'inline-block' }}>
                        <Text>
                            Each component comes with React file(s) and a<Monospace>sass</Monospace>{' '}
                            file.
                        </Text>
                        <ul>
                            <li>
                                Components are exported in
                                <Monospace>ui/src/index.js</Monospace>
                            </li>
                            <li>
                                Styles are included in
                                <Monospace>ui/src/style/ui.full.scss</Monospace>
                            </li>
                        </ul>
                        <Text>
                            The name of the UI library is saved into two configuration files and
                            used across the files: by default it is set as
                            <Monospace>borrow-ui</Monospace>.
                        </Text>
                    </div>
                </Col>
                <Col colClassName="col-sm-12 col-md-6">
                    <Text>
                        <Link href="http://getbem.com/introduction/">BEM style</Link> is used to
                        organize the styles and can be easily overridden.
                    </Text>
                    <Text>
                        Components accept many properties (for example
                        <Monospace>mean</Monospace> for buttons) and always allow to combine
                        generated classes with the standard <Monospace>className</Monospace>.
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col colClassName="col-sm-12 col-md-12 col-lg-6">
                    <Title tag="h4">
                        <Monospace>ui/src/components/link/Link.js</Monospace>
                    </Title>
                    <SyntaxHighlight language="jsx" code={linkJSXExample} />
                    <Title tag="h4" className="m-t-20">
                        <Monospace>ui/src/components/link/link.test.js</Monospace>
                    </Title>
                    <SyntaxHighlight language="jsx" code={linkTestExample} />
                </Col>
                <Col colClassName="col-sm-12 col-md-12 col-lg-6">
                    <Title tag="h4">
                        <Monospace>ui/src/components/link/link.scss</Monospace>
                    </Title>
                    <SyntaxHighlight language="scss" code={linkSCSSExample} />
                    <Title tag="h4" className="m-t-20">
                        <Monospace>ui/src/components/link/Link.stories.mdx</Monospace>
                    </Title>
                    <SyntaxHighlight language="jsx" code={linkStoryExample} />
                </Col>
            </Row>
        </Block>
    );
}

ComponentExample.propTypes = {
    isSmallScreen: PropTypes.bool,
};

let linkJSXExample = `
import React from 'react';
import PropTypes from 'prop-types';

import { UI_PREFIX } from '../../config';
import { propTypesChildren } from '../../utils/types';

const LINK_CLASS = \`\${UI_PREFIX}__link\`;

export function Link({ className = '', children, ...rest }) {
    const linkClassName = \`\${LINK_CLASS} \${className}\`;

    return (
        <a className={linkClassName} {...rest}>
            {children}
        </a>
    );
}

Link.propTypes = {
    className: PropTypes.string,
    children: propTypesChildren,
};
`;

let linkSCSSExample = `
@import '../../vars/main';

.#{$ui-prefix}__link {
    color: $ui-color-accent;
    text-decoration: underline;
}
.#{$ui-prefix}__link:hover {
    color: $ui-color-accent-over;
}
`;

let linkStoryExample = `
import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs';
import { Link } from './Link';

<Meta title="Components/Link" component={Link} />

# Link
Links are used to create connections.

<Canvas>
    <Story name="Default">
        <div>
            A normal link with "a" tag <Link>looks like this</Link>.
        </div>
    </Story>
</Canvas>

## Props
<ArgsTable of={Link} />
`;

let linkTestExample = `
import React from 'react';
import { render, screen } from '@testing-library/react';
import { UI_PREFIX } from '../../config';
import { Link } from './Link';

describe('Link', () => {
    test('renders the link with proper class', () => {
        render(<Link href="/app">App</Link>);

        const link = screen.getByText('App');
        expect(link).toHaveClass(UI_PREFIX + '__link');
    });
});
`;
