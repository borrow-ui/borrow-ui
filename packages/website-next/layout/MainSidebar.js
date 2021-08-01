import React, { useEffect, useState, createContext } from 'react';

import { Sidebar } from '@borrow-ui/ui';

export const sidebarContext = createContext();

export function MainSidebar({ isSmallScreen, SidebarEntry }) {
    const [viewSidebar, setViewSidebar] = useState(false);

    useEffect(() => {
        setViewSidebar(isSmallScreen);
    }, [isSmallScreen]);

    if (!viewSidebar) return null;

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
                <SidebarEntry iconName="auto_stories" href="/tutorial/getting-started">
                    Tutorial
                </SidebarEntry>
                <SidebarEntry iconName="apps" href="/components">
                    Components
                </SidebarEntry>
            </div>
        </Sidebar>
    );
}
