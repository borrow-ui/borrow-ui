import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { Block, Text, Icon, Monospace, Title, Responsive } from '@borrow-ui/ui';

import { ItemsNavigator, ItemsNavigatorSelect } from '../../components/common/ItemsNavigator';
import { IconLink } from '../../components/common/IconLink';

import { ColorsDemo } from '../../components/styles/ColorsDemo';
import { HelpersDemo } from '../../components/styles/HelpersDemo';
import { ImportDemo } from '../../components/styles/ImportDemo';
import { OverridesDemo } from '../../components/styles/OverridesDemo';
import { BuildDemo } from '../../components/styles/BuildDemo';

import styles from './styles.module.scss';

const STYLES = [
    { href: '#colors', label: 'Colors', Component: ColorsDemo },
    { href: '#helpers', label: 'Helpers', Component: HelpersDemo },
];

const USAGE = [
    { href: '#import', label: 'Import', Component: ImportDemo },
    { href: '#overrides', label: 'Overrides', Component: OverridesDemo },
    { href: '#build', label: 'Build', Component: BuildDemo },
];

const ITEMS_GROUPS = [
    { label: 'Styles', items: STYLES },
    { label: 'Usage', items: USAGE },
];

function DemoComponent({ Component, href }) {
    return (
        <div data-href={href}>
            <Component />
        </div>
    );
}

function DemoSection({ title, components, isSmallScreen }) {
    const [smallScreen, setSmallScreen] = useState(false);
    useEffect(() => {
        setSmallScreen(isSmallScreen);
    }, [isSmallScreen]);

    return (
        <>
            <Title tag="h2" className="color-primary">
                {title}
            </Title>
            <Block outstanding={!smallScreen} padded={!smallScreen}>
                {components.map((component) => {
                    return (
                        <DemoComponent
                            Component={component.Component}
                            href={component.href}
                            key={component.href}
                        />
                    );
                })}
            </Block>
        </>
    );
}

export default function Styles() {
    return (
        <>
            <Head>
                <title>Styles</title>
                <meta property="og:title" content="Styles" key="title" />
            </Head>
            <ItemsNavigatorSelect itemsGroups={ITEMS_GROUPS} />
            <div className={styles['styles-showcase']}>
                <div className="website__text">
                    <Title className="color-primary">Styles showcase</Title>
                    <ItemsNavigator itemsGroups={ITEMS_GROUPS} />
                </div>
                <div className="website__text m-b-20">
                    <Text>
                        <Monospace>borrow-ui</Monospace> is styled via SCSS. Each section describes
                        a part of styles. The main parts of components can be controlled via
                        variables (see {'"Usage"'} section).
                    </Text>
                    Dependencies:
                    <ul>
                        <li>
                            <Monospace>SCSS</Monospace>: superset of SCSS
                            <IconLink href="https://sass-lang.com/" />
                        </li>
                    </ul>
                </div>
                <div className="website__text">
                    <Responsive>
                        {(matches) => {
                            return (
                                <DemoSection
                                    title={'Styles'}
                                    components={STYLES}
                                    isSmallScreen={matches.small}
                                />
                            );
                        }}
                    </Responsive>

                    <div className={styles['styles-showcase__separator']} />

                    <Responsive>
                        {(matches) => {
                            return (
                                <DemoSection
                                    title={'Usage'}
                                    components={USAGE}
                                    isSmallScreen={matches.small}
                                />
                            );
                        }}
                    </Responsive>
                </div>
            </div>
        </>
    );
}
