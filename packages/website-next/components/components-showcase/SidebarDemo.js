import React, { useState } from 'react';

import { Title, Sidebar, SidebarEntry, Lorem } from '@borrow-ui/ui';

import { ImportStatement } from './ImportStatement';

import styles from './components-styles.module.scss';

export function SidebarDemo() {
    return (
        <div className={styles['components-showcase__component']}>
            <a name="sidebars" className="component-anchor">
                <Title tag="h2" className="color-secondary">
                    Sidebars
                </Title>
            </a>
            <ImportStatement
                importStatement="import { Sidebar } from '@borrow-ui/ui';"
                docs="?path=/docs/components-sidebar--default-story"
            />
            <div style={{ height: 600 }} className="flex-start-start">
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
                            Click arrow to view
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
                            <span>No Icon or shortcut w/ spacer</span>
                        </SidebarEntry>
                    </div>
                    <div>
                        <span className="flex-center-center p-b-5">v1.0</span>
                    </div>
                </Sidebar>
                <div style={{ flexGrow: 1, padding: 20, overflow: 'auto', height: '100%' }}>
                    <Lorem />
                </div>
            </div>
        </div>
    );
}
