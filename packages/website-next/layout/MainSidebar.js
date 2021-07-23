import React, { createContext } from 'react';

import { Sidebar } from '@borrow-ui/ui';

export const sidebarContext = createContext();

export function MainSidebar({ SidebarEntry }) {
    return (
        <Sidebar
            sidebarContext={sidebarContext}
            hideTrigger
            shadowWhenOpen={false}
            className="main-sidebar"
            stickyTop={true}
        >
            <div>
                <SidebarEntry iconName="home" href="/">
                    Home
                </SidebarEntry>
                <SidebarEntry iconName="auto_stories" href="/tour">
                    Tour
                </SidebarEntry>
                <SidebarEntry iconName="apps" href="/components">
                    Components
                </SidebarEntry>
            </div>
        </Sidebar>
    );
}
