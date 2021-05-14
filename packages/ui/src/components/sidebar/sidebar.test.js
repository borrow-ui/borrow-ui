import React, { Fragment, useContext } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar, SidebarContext } from './Sidebar';
import { SidebarEntry } from './SidebarEntry';
import { UI_PREFIX } from '../../config';

describe('Sidebar', () => {
    test('renders a Sidebar with content on top and bottom', async () => {
        render(
            <Sidebar
                data-testid="sidebar"
                top={(sidebarState, setSidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry sidebarState={sidebarState} iconName="dashboard">
                                With Icon
                            </SidebarEntry>
                            <SidebarEntry sidebarState={sidebarState}>Without Icon</SidebarEntry>
                        </Fragment>
                    );
                }}
                bottom={() => <span>Bottom</span>}
            />
        );

        const sidebar = screen.getByTestId('sidebar');
        const sidebarTrigger = screen.getByTestId('sidebar-trigger');

        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container`);
        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container--closed`);

        expect(screen.getByText('With Icon')).toBeInTheDocument();
        expect(screen.getByText('Without Icon')).toBeInTheDocument();
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
        render(
            <Sidebar
                data-testid="sidebar"
                stickyTop={true}
                closedWidth={200}
                top={() => <span>Top</span>}
            />
        );

        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toHaveStyle('width: 200px');
        expect(sidebar).toHaveClass(`${UI_PREFIX}__sidebar__container--sticky`);
    });

    test('renders a Sidebar with no trigger', () => {
        render(<Sidebar disableTrigger={true} top={() => <span>Top</span>} />);

        expect(screen.queryByTestId('sidebar-trigger')).not.toBeInTheDocument();
    });

    test('renders a Sidebar with context provider', async () => {
        const Trigger = function () {
            const [sidebarState, setSidebarState] = useContext(SidebarContext);
            return (
                <span
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            status: sidebarState.status === 'open' ? 'closed' : 'open',
                        })
                    }
                >
                    Trigger
                </span>
            );
        };
        render(
            <Sidebar.Provider>
                <div>
                    <Trigger />
                    <div>Header</div>
                </div>
                <div>
                    <Sidebar
                        data-testid="sidebar"
                        disableTrigger={true}
                        sidebarContext={SidebarContext}
                        top={() => <span>Top</span>}
                    />
                    <div>Content</div>
                </div>
            </Sidebar.Provider>
        );

        const customTrigger = screen.getByText('Trigger');

        // Closed by default
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
        // Click the trigger to open
        await act(async () => {
            await userEvent.click(customTrigger);
        });

        expect(screen.getByTestId('sidebar')).toHaveClass(`${UI_PREFIX}__sidebar__container--open`);
        // closes from open status
        await act(async () => {
            await userEvent.click(customTrigger);
        });
        expect(screen.getByTestId('sidebar')).toHaveClass(
            `${UI_PREFIX}__sidebar__container--closed`
        );
    });
});
