import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { Sidebar, SidebarContext, SidebarEntry } from '@borrow-ui/ui';

export function MainSidebar({ isSmallScreen }) {
    const location = useLocation();

    const className = location.pathname === '/' ? 'website__sidebar--home' : '';

    return (
        <Sidebar
            stickyTop={46}
            disableTrigger={true}
            height={'calc(100vh - 46px)'}
            closedWidth={isSmallScreen ? 0 : undefined}
            top={sidebarState => <SidebarContent sidebarState={sidebarState} />}
            sidebarContext={SidebarContext}
            className={className}
        />
    );
}

MainSidebar.propTypes = {
    isSmallScreen: PropTypes.bool,
};

function SidebarContent({ sidebarState }) {
    return (
        <Fragment>
            <SidebarEntry sidebarState={sidebarState} iconName="home" link="/">
                Home
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState} iconName="menu_book" link="/docs">
                Docs
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState} iconName="dashboard" link="/dashboard">
                Dashboard
            </SidebarEntry>
            <SidebarEntry
                sidebarState={sidebarState}
                iconName="palette"
                link="/components-showcase/single-page"
                id="sidebar-components-showcase"
            >
                Style Showcase
            </SidebarEntry>
        </Fragment>
    );
}

SidebarContent.propTypes = {
    sidebarState: PropTypes.object.isRequired,
};
