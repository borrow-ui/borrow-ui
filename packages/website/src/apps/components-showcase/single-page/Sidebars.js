import React from 'react';

import { Lorem, Sidebar, SidebarEntry, SidebarMenu } from '@borrow-ui/ui/lib';

import './sidebars.scss';

export function Sidebars() {
    return (
        <div className="m-b-20">
            <h1>Sidebars</h1>
            <div style={{ display: 'flex' }} className="singlepage__sidebars__sidebar-container">
                <Sidebar
                    disableTrigger={true}
                    initialStatus={'open'}
                    top={() => SidebarMenuNavigator()}
                />
                <div className="p-20">
                    <h2>Non collapsible Sidebar with SidebarMenu</h2>
                    <Lorem />
                </div>
            </div>
            <div style={{ display: 'flex' }} className="singlepage__sidebars__sidebar-container">
                <Sidebar initialStatus={'closed'} top={SidebarMenuNavigatorCollapsible} />
                <div className="p-20">
                    <h2>Collapsible Sidebar with SidebarMenu</h2>
                    <Lorem />
                </div>
            </div>
        </div>
    );
}

function SidebarMenuNavigator() {
    return (
        <SidebarMenu isPadded={true}>
            <SidebarMenu.Title>Section Title 1</SidebarMenu.Title>
            <SidebarMenu.Entry isActive={true}>Active entry</SidebarMenu.Entry>
            <SidebarMenu.Entry>Entry 2</SidebarMenu.Entry>
            <SidebarMenu.Entry>Entry 3</SidebarMenu.Entry>
            <SidebarMenu.Separator />
            <SidebarMenu.Title>Section Title 2</SidebarMenu.Title>
            <SidebarMenu.Entry>Entry 4</SidebarMenu.Entry>
        </SidebarMenu>
    );
}

function SidebarMenuNavigatorCollapsible(sidebarState, setSidebarState) {
    return (
        <SidebarMenu isPadded={false}>
            <SidebarEntry
                sidebarState={sidebarState}
                iconName="dashboard"
                onClick={() => window.alert('Dashboard clicked! Set via rest spread')}
            >
                Dashboard
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState} iconName="palette" link="/style-showcase">
                Style Showcase
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState} shortcut="SC">
                Shortcut
            </SidebarEntry>
            <SidebarEntry
                sidebarState={sidebarState}
                iconName="menu"
                id="showcase-entry-with-id"
                onClick={() =>
                    setSidebarState({ ...sidebarState, activeId: 'showcase-entry-with-id' })
                }
                details={
                    <ul>
                        <li>Row 1</li>
                        <li>Row 2</li>
                    </ul>
                }
            >
                With Details (click me)
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState}>
                <span>No Icon or shortcut</span>
            </SidebarEntry>
            <SidebarEntry sidebarState={sidebarState} shortcut={null}>
                <span>No Icon or shortcut (with spacer)</span>
            </SidebarEntry>
            <SidebarEntry
                sidebarState={sidebarState}
                shortcut={'RS'}
                onClick={() => setSidebarState({ ...sidebarState, activeId: undefined })}
            >
                Reset Active State
            </SidebarEntry>
        </SidebarMenu>
    );
}
