import React, { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar, SidebarBody } from './Sidebar';
import { SidebarEntry } from './SidebarEntry';
import { SidebarContext, getSidebarContextDefaultState } from './SidebarContext';
import { getShortcut } from './SidebarEntryLabelShortcut';
import { SidebarTrigger, SidebarCustomTrigger } from './SidebarTrigger';
import { UI_PREFIX } from '../../config';

describe('Sidebar', () => {
    test('renders a Sidebar', async () => {
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

    test('is closed when an entry with autoCloseLink is clicked', async () => {
        render(
            <Sidebar initialState={{ autoCloseLink: true }} data-testid="sidebar">
                <div>
                    <SidebarEntry iconName="dashboard" href="/">
                        With AutoClose
                    </SidebarEntry>
                </div>
            </Sidebar>
        );

        const sidebar = screen.getByTestId('sidebar');
        const sidebarTrigger = screen.getByTestId('sidebar-trigger');

        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container--closed`);

        // opens from default close status
        await userEvent.click(sidebarTrigger);
        expect(screen.getByTestId('sidebar')).toHaveClass(`${UI_PREFIX}__sidebar__container--open`);

        // closes from open status
        await userEvent.click(screen.getByText('With AutoClose'));
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
    });

    test('renders a sticky Sidebar with a custom closed width', () => {
        render(
            <Sidebar data-testid="sidebar" stickyTop={5} closedWidth={200}>
                <span>Top</span>
            </Sidebar>
        );

        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toHaveStyle('width: 200px');
        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container--sticky`);
    });

    test('renders a Sidebar with no trigger', () => {
        render(
            <Sidebar hideTrigger={true}>
                <span>Top</span>
            </Sidebar>
        );

        expect(screen.queryByTestId('sidebar-trigger')).not.toBeInTheDocument();
    });

    test('renders a SidebarBody with context provider', async () => {
        function Layout() {
            const contextValue = useState(getSidebarContextDefaultState());

            return (
                <SidebarContext.Provider value={contextValue}>
                    <div>
                        <SidebarCustomTrigger>
                            {({ toggleStatus }) => {
                                return <button onClick={toggleStatus}>OpenClose</button>;
                            }}
                        </SidebarCustomTrigger>
                        <div>Header</div>
                    </div>
                    <div>
                        <SidebarBody data-testid="sidebar" hideTrigger={true}>
                            <SidebarEntry
                                content="Extra content"
                                id="1"
                                entryClickToggleContent={true}
                            >
                                Top
                            </SidebarEntry>
                        </SidebarBody>
                        <div>Content</div>
                    </div>
                </SidebarContext.Provider>
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

    test('renders a SidebarBody with context provider and default Trigger', async () => {
        function Layout() {
            const contextValue = useState(getSidebarContextDefaultState());

            return (
                <SidebarContext.Provider value={contextValue}>
                    <div>
                        <SidebarTrigger />
                        <div>Header</div>
                    </div>
                    <div>
                        <SidebarBody data-testid="sidebar" hideTrigger={true}>
                            <SidebarEntry>Top</SidebarEntry>
                        </SidebarBody>
                        <div>Content</div>
                    </div>
                </SidebarContext.Provider>
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
        expect(getShortcut('')).toBe('');
        expect(getShortcut('a')).toBe('A');
        expect(getShortcut('ab')).toBe('AB');
        expect(getShortcut('a b')).toBe('AB');
        expect(getShortcut('a b c')).toBe('AB');
        expect(getShortcut('abc')).toBe('AB');
    });
});
