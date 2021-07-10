import React, { useContext, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useSidebar, Sidebar } from './Sidebar';
import { getShortcut } from './SidebarEntryLabelShortcut';
import { UI_PREFIX } from '../../config';

describe('Sidebar', () => {
    test('renders a Sidebar', async () => {
        const { Sidebar, SidebarEntry } = useSidebar();
        render(
            <Sidebar data-testid="sidebar">
                <div>
                    <SidebarEntry iconName="dashboard">With Icon</SidebarEntry>
                    <SidebarEntry>Without Icon</SidebarEntry>
                    <SidebarEntry shortcut="WS">With Shortcut</SidebarEntry>
                </div>
                <span>Bottom</span>
            </Sidebar>
        );

        const sidebar = screen.getByTestId('sidebar');
        const sidebarTrigger = screen.getByTestId('sidebar-trigger');

        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container`);
        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container--closed`);

        expect(screen.getByText('With Icon')).toBeInTheDocument();
        expect(screen.getByText('Without Icon')).toBeInTheDocument();
        expect(screen.getByText('WS')).toBeInTheDocument();
        expect(screen.getByText('With Shortcut')).toBeInTheDocument();
        expect(screen.getByText('Bottom')).toBeInTheDocument();

        expect(sidebarTrigger).toHaveClass(`${UI_PREFIX}__sidebar__trigger`);

        // opens from default close status
        await userEvent.click(sidebarTrigger);
        expect(screen.getByTestId('sidebar')).toHaveClass(`${UI_PREFIX}__sidebar__container--open`);

        // closes from open status
        await userEvent.click(sidebarTrigger);
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
    });

    test('renders a sticky Sidebar with a custom closed width', () => {
        const { Sidebar } = useSidebar();
        render(
            <Sidebar data-testid="sidebar" stickyTop={true} closedWidth={200}>
                <span>Top</span>
            </Sidebar>
        );

        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toHaveStyle('width: 200px');
        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container--sticky`);
    });

    test('renders a Sidebar with no trigger', () => {
        const { Sidebar } = useSidebar();

        render(
            <Sidebar hideTrigger={true}>
                <span>Top</span>
            </Sidebar>
        );

        expect(screen.queryByTestId('sidebar-trigger')).not.toBeInTheDocument();
    });

    test('renders a Sidebar with context provider', async () => {
        const { sidebarContext, getDefaultStatus, SidebarEntry, CustomTrigger } = useSidebar();
        function Layout() {
            const contextValue = useState(getDefaultStatus());

            return (
                <sidebarContext.Provider value={contextValue}>
                    <div>
                        <CustomTrigger>
                            {({ toggleStatus }) => {
                                return <button onClick={toggleStatus}>OpenClose</button>;
                            }}
                        </CustomTrigger>
                        <div>Header</div>
                    </div>
                    <div>
                        <Sidebar
                            sidebarContext={sidebarContext}
                            data-testid="sidebar"
                            hideTrigger={true}
                        >
                            <SidebarEntry
                                content="Extra content"
                                id="1"
                                entryClickToggleContent={true}
                            >
                                Top
                            </SidebarEntry>
                        </Sidebar>
                        <div>Content</div>
                    </div>
                </sidebarContext.Provider>
            );
        }

        render(<Layout />);

        const customTrigger = screen.getByText('OpenClose');

        // Closed by default
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
        // Click the trigger to open
        await act(async () => {
            await userEvent.click(customTrigger);
        });

        // Click the extra content entry to view content
        await act(async () => {
            await userEvent.click(screen.getByText('Top'));
        });
        expect(screen.queryByText('Extra content')).toBeInTheDocument();

        expect(screen.getByTestId('sidebar')).toHaveClass(`${UI_PREFIX}__sidebar__container--open`);
        // closes from open status
        await act(async () => {
            await userEvent.click(customTrigger);
        });
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
    });

    test('renders a Sidebar with context provider and default Trigger', async () => {
        const { sidebarContext, getDefaultStatus, SidebarEntry, SidebarTrigger } = useSidebar();
        function Layout() {
            const contextValue = useState(getDefaultStatus());

            return (
                <sidebarContext.Provider value={contextValue}>
                    <div>
                        <SidebarTrigger />
                        <div>Header</div>
                    </div>
                    <div>
                        <Sidebar
                            sidebarContext={sidebarContext}
                            data-testid="sidebar"
                            hideTrigger={true}
                        >
                            <SidebarEntry>Top</SidebarEntry>
                        </Sidebar>
                        <div>Content</div>
                    </div>
                </sidebarContext.Provider>
            );
        }

        render(<Layout />);

        // Closed by default
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
        // Click the trigger to open
        await act(async () => {
            await userEvent.click(screen.getByTestId('sidebar-trigger'));
        });
        expect(screen.getByTestId('sidebar')).toHaveClass(`${UI_PREFIX}__sidebar__container--open`);
    });
});

describe("Sidebar's getShortcut", () => {
    test('works as expected', () => {
        expect(getShortcut(null)).toBe(null);
        expect(getShortcut(1)).toBe(1);
        expect(getShortcut('')).toBe('');
        expect(getShortcut('a')).toBe('A');
        expect(getShortcut('ab')).toBe('AB');
        expect(getShortcut('a b')).toBe('AB');
        expect(getShortcut('a b c')).toBe('AB');
        expect(getShortcut('abc')).toBe('AB');
    });
});
