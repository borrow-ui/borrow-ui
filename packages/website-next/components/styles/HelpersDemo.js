import React from 'react';

import { Title, Monospace, Button } from '@borrow-ui/ui';

import styles from './styles-styles.module.scss';

const FLEX_HELPERS = ['flex', 'flex-inline', 'flex--wrap'];

const Ms = Monospace;

export function HelpersDemo() {
    return (
        <div className={styles['styles-showcase__component']}>
            <a name="helpers" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Helpers
                </Title>
            </a>
            <div>
                Class helpers are available, to simplify standard operations such as adding margins,
                padding or the most common flex properties.
                <br />
                Few of them have an <Ms>!important</Ms> modifiers, as they are used to override
                default properties.
            </div>
            <Title tag="h3" className="color-accent">
                Flex
            </Title>
            {FLEX_HELPERS.map((fh) => (
                <Ms key={fh}>.{fh}</Ms>
            ))}
            <div>
                <Ms>
                    .flex-{'{justify-content}'}-{'{align-items}'}
                </Ms>{' '}
                (or{' '}
                <Ms>
                    .flex-{'{horizontal}'}-{'{vertical}'}
                </Ms>
                ) , where:
                <ul>
                    <li>
                        <Ms>justify-content</Ms> can be one of <Ms>center</Ms>, <Ms>start</Ms>,{' '}
                        <Ms>end</Ms> and <Ms>spacebetween</Ms>
                    </li>
                    <li>
                        <Ms>align-items</Ms> can be one of <Ms>center</Ms>, <Ms>start</Ms> and{' '}
                        <Ms>end</Ms>
                    </li>
                </ul>
                Note: <Ms>start</Ms> and <Ms>end</Ms> are shortcuts for <Ms>flex-start</Ms> and{' '}
                <Ms>flex-end</Ms> respectively.
            </div>
            <Title tag="h4">Examples</Title>
            <div
                className="flex-center-center w-100pc h-100 m-b-20"
                style={{ border: '1px solid #efefef' }}
            >
                <Ms>.flex-center-center</Ms>
                <Button size="smaller" className="m-0">
                    A button
                </Button>
            </div>
            <div
                className="flex-end-start w-100pc h-100 m-b-20"
                style={{ border: '1px solid #efefef' }}
            >
                <Ms>.flex-end-start</Ms>
                <Button size="smaller" className="m-0">
                    A button
                </Button>
            </div>
            <div
                className="flex-spacebetween-end w-100pc h-100 m-b-20"
                style={{ border: '1px solid #efefef' }}
            >
                <Ms>.flex-spacebetween-end</Ms>
                <Button size="smaller" className="m-0">
                    A button
                </Button>
            </div>
            <Title tag="h3" className="color-accent">
                Other display helpers
            </Title>
            <Ms>.display-inline-block</Ms>, <Ms>.display-none</Ms>
            <Title tag="h3" className="color-accent">
                Cursor
            </Title>
            <Ms>.cursor-pointer</Ms>
            <Title tag="h3" className="color-accent">
                Alignment
            </Title>
            <Ms>.text-align-left</Ms>, <Ms>.text-align-center</Ms>, <Ms>.text-align-right</Ms>
            <Title tag="h3" className="color-accent">
                Overflow
            </Title>
            <Ms>.overflow-auto</Ms>, <Ms>.overflow-hidden</Ms>, <Ms>.overflow-scroll</Ms>
            <Title tag="h3" className="color-accent">
                Width <span className="color-warning">(with !important)</span>
            </Title>
            <div>
                <Ms>.w-{'{number}pc'}</Ms>: % width, with number one of{' '}
                {[10, 20, 25, 30, 33, 40, 50, 60, 66, 70, 75, 80, 90, 100].map((n) => (
                    <Ms key={n}>{n}</Ms>
                ))}
            </div>
            <div>
                <Ms>.w-{'{number}'}</Ms>: `px` width, with number one of{' '}
                {[25, 50, 75, 100, 120, 150, 180, 200, 300, 400, 500].map((n) => (
                    <Ms key={n}>{n}</Ms>
                ))}
            </div>
            <Title tag="h3" className="color-accent">
                Height <span className="color-warning">(with !important)</span>
            </Title>
            <div>
                <Ms>.h-{'{number}'}</Ms>: `px` width, with number one of{' '}
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500].map((n) => (
                    <Ms key={n}>{n}</Ms>
                ))}
            </div>
            <Title tag="h3" className="color-accent">
                Margin <span className="color-warning">(with !important)</span>
            </Title>
            <div>
                <ul>
                    <li>
                        <Ms>.m-{'{number}'}</Ms>: `px` margin in all directions, with number one of{' '}
                        {[0, 5, 10, 15, 20].map((n) => (
                            <Ms key={n}>{n}</Ms>
                        ))}
                    </li>
                    <li>
                        <Ms>
                            .m-{'{direction}'}-{'{number}'}
                        </Ms>
                        : `px` margin in specified direction, with direction one of{' '}
                        {['t', 'r', 'b', 'l'].map((n) => (
                            <Ms key={n}>{n}</Ms>
                        ))}
                    </li>
                </ul>
            </div>
            <Title tag="h3" className="color-accent">
                Padding <span className="color-warning">(with !important)</span>
            </Title>
            <div>
                <ul>
                    <li>
                        <Ms>.p-{'{number}'}</Ms>: `px` padding in all directions, with number one of{' '}
                        {[0, 5, 10, 15, 20].map((n) => (
                            <Ms key={n}>{n}</Ms>
                        ))}
                    </li>
                    <li>
                        <Ms>
                            .p-{'{direction}'}-{'{number}'}
                        </Ms>
                        : `px` padding in specified direction, with direction one of{' '}
                        {['t', 'r', 'b', 'l'].map((n) => (
                            <Ms key={n}>{n}</Ms>
                        ))}
                    </li>
                </ul>
            </div>
            <Title tag="h3" className="color-accent">
                Border radius <span className="color-warning">(with !important)</span>
            </Title>
            <div>
                <ul>
                    <li>
                        <Ms>.border-radius-{'{number}'}</Ms>: `px` border radius in all corners,
                        with number one of{' '}
                        {[0, 5, 10, 15, 20].map((n) => (
                            <Ms key={n}>{n}</Ms>
                        ))}
                    </li>
                    <li>
                        <Ms>.border-radius-50pc</Ms>: border radius set to 50%
                    </li>
                </ul>
            </div>
        </div>
    );
}
