import React from 'react';

import { Block, Title, Link } from '@borrow-ui/ui';

export function Roadmap() {
    return (
        <Block>
            <Title tag="h2" className="color-primary">
                Roadmap
            </Title>
            <Link href="https://github.com/borrow-ui/borrow-ui/milestones">View on github</Link>:
            <ul>
                <li>Documentation</li>
                <li>Tests</li>
                <li>Storybook</li>
                <li>Script to rename the UI library</li>
                <li>
                    Examples:
                    <ul>
                        <li>Dashboard</li>
                        <li>Blog</li>
                    </ul>
                </li>
            </ul>
        </Block>
    );
}
