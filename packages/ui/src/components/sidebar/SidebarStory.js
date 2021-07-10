import React from 'react';

import { useSidebar } from './Sidebar';

export function SidebarStory() {
    const { Sidebar, SidebarEntry } = useSidebar();

    return (
        <Sidebar>
            <div>
                <SidebarEntry iconName="dashboard">Dashboard</SidebarEntry>
                <SidebarEntry shortcut="SC">Shortcut</SidebarEntry>
                <SidebarEntry isActive={true} shortcut="AE">
                    Active Entry
                </SidebarEntry>
                <SidebarEntry
                    id="entry-with-content-arrow"
                    iconName="arrow_forward"
                    content={
                        <ul>
                            <li>Row 1</li>
                            <li>Row 2</li>
                        </ul>
                    }
                >
                    Click arrow to view content
                </SidebarEntry>
                <SidebarEntry
                    id="entry-with-content"
                    iconName="assignment"
                    content={
                        <ul>
                            <li>Row 1</li>
                            <li>Row 2</li>
                        </ul>
                    }
                    entryClickToggleContent={true}
                >
                    Click me view content
                </SidebarEntry>
                <SidebarEntry>
                    <span>No Icon or shortcut</span>
                </SidebarEntry>
                <SidebarEntry shortcut={null}>
                    <span>No Icon or shortcut (with spacer)</span>
                </SidebarEntry>
            </div>
            <div>
                <span className="flex-center-center p-b-5">v1.0</span>
            </div>
        </Sidebar>
    );
}
