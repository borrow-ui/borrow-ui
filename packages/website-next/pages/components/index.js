import React from 'react';
import Head from 'next/head';

import { Block, Monospace, Title, Text } from '@borrow-ui/ui';

import { ItemsNavigator, ItemsNavigatorSelect } from '../../components/common/ItemsNavigator';
import { IconLink } from '../../components/common/IconLink';

import { AccordionDemo } from '../../components/components-showcase/AccordionDemo';
import { BadgeDemo } from '../../components/components-showcase/BadgeDemo';
import { BlockDemo } from '../../components/components-showcase/BlockDemo';
import { BreadcrumbsDemo } from '../../components/components-showcase/BreadcrumbsDemo';
import { ButtonsDemo } from '../../components/components-showcase/ButtonsDemo';
import { CardsDemo } from '../../components/components-showcase/CardsDemo';
import { IconDemo } from '../../components/components-showcase/IconDemo';
import { LinkDemo } from '../../components/components-showcase/LinkDemo';
import { LoaderDemo } from '../../components/components-showcase/LoaderDemo';
import { LoremDemo } from '../../components/components-showcase/LoremDemo';
import { ModalDemo } from '../../components/components-showcase/ModalDemo';
import { NavbarDemo } from '../../components/components-showcase/NavbarDemo';
import { NavbarMenuDemo } from '../../components/components-showcase/NavbarMenuDemo';
import { PanelDemo } from '../../components/components-showcase/PanelDemo';
import { ReferenceOverlayDemo } from '../../components/components-showcase/ReferenceOverlayDemo';
import { SearchBarDemo } from '../../components/components-showcase/SearchBarDemo';
import { SidebarDemo } from '../../components/components-showcase/SidebarDemo';
import { TableDemo } from '../../components/components-showcase/TableDemo';
import { TabsDemo } from '../../components/components-showcase/TabsDemo';
import { TileLinkDemo } from '../../components/components-showcase/TileLinkDemo';
import { TooltipDemo } from '../../components/components-showcase/TooltipDemo';
import { HorizontalFormDemo } from '../../components/components-showcase/HorizontalFormDemo';
import { VerticalFormDemo } from '../../components/components-showcase/VerticalFormDemo';
import { TitleDemo } from '../../components/components-showcase/TitleDemo';
import { TextsDemo } from '../../components/components-showcase/TextsDemo';
import { GridDemo } from '../../components/components-showcase/GridDemo';

import styles from './components.module.scss';

const COMPONENTS = [
    { href: '#accordions', label: 'Accordions', Component: AccordionDemo },
    { href: '#badges', label: 'Badges', Component: BadgeDemo },
    { href: '#blocks', label: 'Blocks', Component: BlockDemo },
    { href: '#breadcrumbs', label: 'Breadcrumbs', Component: BreadcrumbsDemo },
    { href: '#buttons', label: 'Buttons', Component: ButtonsDemo },
    { href: '#cards', label: 'Cards', Component: CardsDemo },
    { href: '#icons', label: 'Icons', Component: IconDemo },
    { href: '#links', label: 'Links', Component: LinkDemo },
    { href: '#loaders', label: 'Loaders', Component: LoaderDemo },
    { href: '#lorem', label: 'Lorem', Component: LoremDemo },
    { href: '#modals', label: 'Modals', Component: ModalDemo },
    { href: '#navbars', label: 'Navbars', Component: NavbarDemo },
    { href: '#navbarmenus', label: 'Navbar Menus', Component: NavbarMenuDemo },
    { href: '#panels', label: 'Panels', Component: PanelDemo },
    { href: '#referenceoverlays', label: 'Reference Overlays', Component: ReferenceOverlayDemo },
    { href: '#searchbars', label: 'Search Bars', Component: SearchBarDemo },
    { href: '#sidebars', label: 'Sidebars', Component: SidebarDemo },
    { href: '#tables', label: 'Tables', Component: TableDemo },
    { href: '#tabs', label: 'Tabs', Component: TabsDemo },
    { href: '#tilelinks', label: 'Tile Links', Component: TileLinkDemo },
    { href: '#tooltips', label: 'Tooltips', Component: TooltipDemo },
];

const FORMS = [
    { href: '#horizontalform', label: 'Horizontal Form', Component: HorizontalFormDemo },
    { href: '#verticalform', label: 'Vertical Form', Component: VerticalFormDemo },
];

const TYPOGRAPHY = [
    { href: '#titles', label: 'Titles and Subtitles', Component: TitleDemo },
    { href: '#texts', label: 'Texts', Component: TextsDemo },
    { href: '#grid', label: 'Grid', Component: GridDemo },
];

const ITEMS_GROUPS = [
    { label: 'Typography', items: TYPOGRAPHY },
    { label: 'Components', items: COMPONENTS },
    { label: 'Forms', items: FORMS },
];

function DemoSection({ Component, href }) {
    return (
        <div data-href={href} style={{ marginBottom: 50 }}>
            <Component />
        </div>
    );
}

export default function Components() {
    return (
        <>
            <Head>
                <title>Components</title>
                <meta property="og:title" content="Components" key="title" />
            </Head>
            <ItemsNavigatorSelect itemsGroups={ITEMS_GROUPS} />
            <div className={styles['components-showcase']}>
                <div className="website__text">
                    <Title className="color-primary">Components showcase</Title>
                    <ItemsNavigator itemsGroups={ITEMS_GROUPS} />
                </div>
                <div className="website__text m-b-20">
                    <Text>
                        In this page you can find a quick demonstration of the available components.
                    </Text>
                    <Text>
                        Each component description and documentation is available on the respective
                        docs page, created with Storybook.
                    </Text>
                </div>
                <div className="website__text">
                    <Title tag="h2" className="color-primary">
                        Typography
                    </Title>
                    <p>A set of components to organize the pages and texts.</p>
                    <p>
                        Here you can find <Monospace>borrow-ui</Monospace> typography showcase.
                        <br />
                    </p>
                    Dependencies:
                    <ul>
                        <li>
                            <Monospace>flexboxgrid 2</Monospace>: CSS library to create flexible
                            layouts
                            <IconLink href="https://evgenyrodionov.github.io/flexboxgrid2/" />
                        </li>
                    </ul>
                    <Block outstanding={true} style={{ marginTop: 40 }}>
                        {TYPOGRAPHY.map((component) => {
                            return (
                                <DemoSection
                                    Component={component.Component}
                                    href={component.href}
                                    key={component.href}
                                />
                            );
                        })}
                    </Block>
                    <div className={styles['components-showcase__separator']} />
                    <Title tag="h2" className="color-primary">
                        Components
                    </Title>
                    <p>
                        Components are the main building blocks of a UI. For a UI Kit, they should
                        be easy to extend and their style easy to customize/override (depending on
                        the styling strategy).
                    </p>
                    <p>
                        Here you can find <Monospace>borrow-ui</Monospace> components showcase.
                        <br />
                    </p>
                    Dependencies:
                    <ul>
                        <li>
                            <Monospace>Material Design Icons DX</Monospace>: icon set
                            <IconLink href="https://jossef.github.io/material-design-icons-iconfont/" />
                        </li>
                        <li>
                            <Monospace>Popper JS</Monospace>: positioning engine
                            <IconLink href="https://popper.js.org/" />
                        </li>
                        <li>
                            <Monospace>lodash.debounce</Monospace>: debounce utility
                            <IconLink href="https://github.com/lodash/lodash" />
                        </li>
                        <li>
                            <Monospace>Prism JS</Monospace>: syntax highlighter
                            <IconLink href="https://prismjs.com/" />
                        </li>
                        <li>
                            <Monospace>react-media</Monospace>: media queries in React
                            <IconLink href="https://github.com/ReactTraining/react-media" />
                        </li>
                    </ul>
                    <Block outstanding={true} style={{ marginTop: 40 }}>
                        {COMPONENTS.map((component) => {
                            return (
                                <DemoSection
                                    Component={component.Component}
                                    href={component.href}
                                    key={component.href}
                                />
                            );
                        })}
                    </Block>
                    <div className={styles['components-showcase__separator']} />
                    <Title tag="h2" className="color-primary">
                        Forms
                    </Title>
                    <p>
                        Forms are fundamental in any UI that should be supposed to get data form the
                        users.
                    </p>
                    <p>
                        Here you can find <Monospace>borrow-ui</Monospace> forms showcase.
                        <br />
                    </p>
                    Dependencies:
                    <ul>
                        <li>
                            <Monospace>Day.js</Monospace>: dates manipulation
                            <IconLink href="https://day.js.org/" />
                        </li>
                        <li>
                            <Monospace>react-day-picker</Monospace>: date picker component
                            <IconLink href="https://react-day-picker.js.org/" />
                        </li>
                        <li>
                            <Monospace>react-dropzone</Monospace>: files upload component
                            <IconLink href="https://react-dropzone.js.org/" />
                        </li>
                        <li>
                            <Monospace>React Select</Monospace>: Select Input control
                            <IconLink href="https://react-select.com/home" />
                        </li>
                    </ul>
                    <Block outstanding={true} style={{ marginTop: 40 }}>
                        {FORMS.map((component) => {
                            return (
                                <DemoSection
                                    Component={component.Component}
                                    href={component.href}
                                    key={component.href}
                                />
                            );
                        })}
                    </Block>
                </div>
            </div>
        </>
    );
}
