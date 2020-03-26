import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, useParams, useLocation, matchPath } from 'react-router-dom';

import { Page, Sidebar, SidebarMenu } from '@borrow-ui/ui/lib';

import { ShowCaseButton } from './components/ShowCaseButton';
import { ShowCaseSidebar } from './components/ShowCaseSidebar';

import './style-showcase.scss';

const STYLE_SHOWCASE_URL = '/showcase';
const STYLE_SHOWCASE_BREADCRUMBS = [
    { link: '/', label: 'Home' },
    { link: STYLE_SHOWCASE_URL, label: 'Showcase' },
];

const SECTIONS = {
    BUTTON: { component: ShowCaseButton, label: 'Buttons' },
    PAGE: { component: ComingSoon, label: 'Page', comingSoon: true },
    SIDEBAR: { component: ShowCaseSidebar, label: 'Sidebar' },
    SIDEBAR_MENU: { component: ComingSoon, label: 'Sidebar Menu', comingSoon: true },
};

export function ComponentsShowcase() {
    const { pathname } = useLocation();
    const routeMatch = matchPath(pathname, {
        path: `${STYLE_SHOWCASE_URL}/:sectionName`,
        exact: true,
        strict: true,
    });
    const sectionName = routeMatch ? routeMatch.params.sectionName : '';
    const sectionNameKey = sectionName.toUpperCase().replace('-', '_');
    const sections = getNavigatorSections({ sectionName });

    return (
        <Fragment>
            <div style={{ display: 'flex' }}>
                <Sidebar
                    disableTrigger={true}
                    initialStatus={'open'}
                    top={() => ShowCaseSidebarNavigator({ sectionName, sections })}
                />
                <Page style={{ width: 'calc(100% - 350px)' }}>
                    <PageHeader scrollRef={pageBodyRef}>
                        <Breadcrumbs breadcrumbs={STYLE_SHOWCASE_BREADCRUMBS} />
                        {sectionNameKey ? SECTIONS[sectionNameKey].label : 'Style Showcase'}
                    </PageHeader>
                    <PageBody fullHeight={true} withPageHeader={true} pageBodyRef={pageBodyRef}>
                        <Switch>
                            <Route
                                exact
                                path={STYLE_SHOWCASE_URL}
                                component={StyleShowcaseLanding}
                            />
                            <Route
                                path={`${STYLE_SHOWCASE_URL}/:sectionName`}
                                component={StyleShowcaseComponentView}
                            />
                        </Switch>
                    </PageBody>
                </Page>
            </div>
        </Fragment>
    );
}

function StyleShowcaseLanding() {
    return (
        <Block isOutstanding={true} isContentCentered={true} style={{ height: '400px' }}>
            <div>
                <h1>The main page is coming soon!</h1>
                <p>
                    In the meantime, you can use the navigator to view the available documentation.
                </p>
            </div>
        </Block>
    );
}

function StyleShowcaseComponentView() {
    const { sectionName } = useParams();
    const sectionNameKey = sectionName.toUpperCase().replace('-', '_');

    if (!SECTIONS[sectionNameKey]) return <InvalidSection />;

    const SelectedComponent = SECTIONS[sectionNameKey].component;

    return <SelectedComponent />;
}

function ComingSoon() {
    return (
        <Block isOutstanding={true} isContentCentered={true} style={{ height: '400px' }}>
            <h1>This component documentation is coming soon!</h1>
        </Block>
    );
}

function InvalidSection() {
    return (
        <Block isOutstanding={true} isContentCentered={true} style={{ height: '400px' }}>
            <h1>This section does not exists.</h1>
        </Block>
    );
}

function getNavigatorSections() {
    const getItem = section => {
        const url = section.toLowerCase().replace('_', '-');
        return {
            ...SECTIONS[section],
            key: url,
            to: `${STYLE_SHOWCASE_URL}/${url}`,
        };
    };

    return [
        {
            title: 'Typography & Style',
            items: [getItem('PAGE'), getItem('BLOCKS'), getItem('COLORS'), getItem('GRID_SYSTEM')],
        },
        {
            title: 'Components',
            items: [
                getItem('BREADCRUMBS'),
                getItem('BUTTON'),
                getItem('SIDEBAR'),
                getItem('SIDEBAR_MENU'),
                getItem('SIDE_PANEL'),
            ],
        },
    ];
}

function ShowCaseSidebarNavigator({ sectionName, sections }) {
    return (
        <SidebarMenu isPadded={true}>
            {sections.map((section, index) => {
                return (
                    <Fragment key={section.title}>
                        {index > 0 && <SidebarMenu.Separator />}
                        <SidebarMenu.Title>{section.title}</SidebarMenu.Title>
                        {section.items.map(item => {
                            return (
                                <SidebarMenu.Entry
                                    key={item.key}
                                    isActive={item.key === sectionName}
                                    tag={Link}
                                    to={item.to}
                                >
                                    {item.label}
                                    {item.comingSoon && (
                                        <Badge
                                            backgroundColor="blue"
                                            color="neutral-light-l2"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Coming Soon
                                        </Badge>
                                    )}
                                </SidebarMenu.Entry>
                            );
                        })}
                    </Fragment>
                );
            })}
        </SidebarMenu>
    );
}

ShowCaseSidebarNavigator.propTypes = {
    sectionName: PropTypes.string,
    sections: PropTypes.array,
};
