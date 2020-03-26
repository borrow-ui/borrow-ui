import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Sidebar, SidebarContext, SidebarEntry } from '@borrow-ui/ui/lib';

import { Header } from './scaffold/header/Header';
import { Routes } from './routes/Routes';

export function Website() {
    const location = useLocation();

    const className = location.pathname === '/' ? 'website__sidebar--home' : '';

    return (
        <div className="borrow-ui__navbar--stycky-margin">
            <Sidebar.Provider>
                <Header />
                <div style={{ display: 'flex' }}>
                    <Sidebar
                        sticky={true}
                        disableTrigger={true}
                        height={'calc(100vh - 46px)'}
                        top={sidebarState => <SidebarContent sidebarState={sidebarState} />}
                        sidebarContext={SidebarContext}
                        className={className}
                    ></Sidebar>
                    <div
                        className="website__content"
                        style={{ display: 'inline-block', flexGrow: 1 }}
                    >
                        <Routes />
                    </div>
                </div>
            </Sidebar.Provider>
        </div>
    );
}

function SidebarContent({ sidebarState }) {
    return (
        <Fragment>
            <SidebarEntry sidebarState={sidebarState} iconName="home" link="/">
                Home
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState} iconName="dashboard" link="/dashboard">
                Dashboard
            </SidebarEntry>
            <SidebarEntry
                sidebarState={sidebarState}
                iconName="palette"
                link="/components-showcase"
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
