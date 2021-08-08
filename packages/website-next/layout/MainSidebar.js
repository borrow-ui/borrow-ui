import React, { useEffect, useState } from 'react';

import { SidebarBody, SidebarEntry } from '@borrow-ui/ui';

import packageJson from '../package.json';

export function MainSidebar({ isSmallScreen }) {
    const [viewSidebar, setViewSidebar] = useState(false);

    useEffect(() => {
        setViewSidebar(isSmallScreen);
    }, [isSmallScreen]);

    if (!viewSidebar) return null;

    return (
        <SidebarBody hideTrigger shadowWhenOpen={false} className="main-sidebar" stickyTop={true}>
            <div>
                <SidebarEntry iconName="home" href="/">
                    Home
                </SidebarEntry>
                <SidebarEntry iconName="auto_stories" href="/getting-started/getting-started">
                    Getting Started
                </SidebarEntry>
                <SidebarEntry iconName="apps" href="/components">
                    Components
                </SidebarEntry>
            </div>
            <div>
                <div className="flex-center-center p-5" style={{ fontSize: 12 }}>
                    v{packageJson.version}
                </div>
            </div>
        </SidebarBody>
    );
}
