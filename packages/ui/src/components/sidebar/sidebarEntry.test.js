import React, { Fragment } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { config } from '../../config';
import { Sidebar } from './Sidebar';
import { SidebarEntry, DETAILS_REQUIRES_ID_AND_SETSIDEBARSTATE } from './SidebarEntry';
import { UI_PREFIX } from '../../config';

describe('Sidebar', () => {
    test('renders a Sidebar with entries with details', async () => {
        render(
            <Sidebar
                data-testid="sidebar"
                top={(sidebarState, setSidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry
                                data-testid="with-details"
                                sidebarState={sidebarState}
                                setSidebarState={setSidebarState}
                                id="with-details"
                                details={<div>Details</div>}
                            >
                                With details
                            </SidebarEntry>
                            <SidebarEntry
                                data-testid="another-details"
                                sidebarState={sidebarState}
                                setSidebarState={setSidebarState}
                                id="another-details"
                                details={<div>Details</div>}
                            >
                                Another details
                            </SidebarEntry>
                        </Fragment>
                    );
                }}
            />
        );
        const sidebarTrigger = screen.getByTestId('sidebar-trigger');

        expect(screen.getByTestId('with-details')).toHaveClass(`${UI_PREFIX}__sidebar__entry`);
        expect(screen.getByText('With details')).toHaveClass(`${UI_PREFIX}__sidebar__entry__label`);

        // Activate "With details"
        await userEvent.click(screen.getByText('With details'));
        expect(screen.getByTestId('with-details')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByText('With details')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry__label--active`
        );
        // Open the sidebar as well
        await userEvent.click(sidebarTrigger);
        // entry should also have an "open" class
        expect(screen.getByTestId('with-details')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active-open`
        );
        // Activate "Another details"
        await userEvent.click(screen.getByText('Another details'));
        expect(screen.getByTestId('another-details')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByText('Another details')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry__label--active`
        );
        // This shuold de-activate "With details"
        expect(screen.getByTestId('with-details')).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByText('With details')).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry__label--active`
        );
        // Closes "Another details"
        await userEvent.click(screen.getByText('Another details'));
        expect(screen.getByTestId('another-details')).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByText('Another details')).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry__label--active`
        );
    });
    test('throws an error if details are passed without id or setSidebarState', () => {
        const err = console.error;
        console.error = jest.fn();
        expect(() => {
            render(
                <Sidebar
                    top={(sidebarState, setSidebarState) => {
                        return (
                            <SidebarEntry sidebarState={sidebarState} details={<div>Details</div>}>
                                With details
                            </SidebarEntry>
                        );
                    }}
                />
            );
        }).toThrowError(DETAILS_REQUIRES_ID_AND_SETSIDEBARSTATE);
        expect(() => {
            render(
                <Sidebar
                    top={(sidebarState, setSidebarState) => {
                        return (
                            <SidebarEntry
                                sidebarState={sidebarState}
                                setSidebarState={setSidebarState}
                                details={<div>Details</div>}
                            >
                                With details
                            </SidebarEntry>
                        );
                    }}
                />
            );
        }).toThrowError(DETAILS_REQUIRES_ID_AND_SETSIDEBARSTATE);
        expect(() => {
            render(
                <Sidebar
                    top={(sidebarState, setSidebarState) => {
                        return (
                            <SidebarEntry
                                sidebarState={sidebarState}
                                id="with-details"
                                details={<div>Details</div>}
                            >
                                With details
                            </SidebarEntry>
                        );
                    }}
                />
            );
        }).toThrowError(DETAILS_REQUIRES_ID_AND_SETSIDEBARSTATE);
        console.error = err;
    });
    test('preserve entry onClick if provided', async () => {
        const testOnClick = jest.fn();

        render(
            <Sidebar
                top={(sidebarState, setSidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry
                                data-testid="with-details"
                                sidebarState={sidebarState}
                                setSidebarState={setSidebarState}
                                id="with-details"
                                details={<div>Details</div>}
                                onClick={testOnClick}
                            >
                                With details
                            </SidebarEntry>
                        </Fragment>
                    );
                }}
            />
        );
        // Activate "With details"
        await userEvent.click(screen.getByText('With details'));
        // Should have called onClick as well
        expect(testOnClick).toBeCalledTimes(1);
    });
    test('reders with an entry with a shortcut', () => {
        render(
            <Sidebar
                top={(sidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry sidebarState={sidebarState} shortcut="SC">
                                Has a shortcut
                            </SidebarEntry>
                        </Fragment>
                    );
                }}
            />
        );
        expect(screen.getByText('SC')).toHaveClass(`${UI_PREFIX}__sidebar__entry__label__shortcut`);
    });
    test('reders entry as with a custom tag', () => {
        const { container } = render(
            <Sidebar
                top={(sidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry sidebarState={sidebarState} tag="a">
                                This is a link
                            </SidebarEntry>
                        </Fragment>
                    );
                }}
            />
        );
        expect(container.querySelector('a')).toHaveClass(`${UI_PREFIX}__sidebar__entry`);
    });
    test('reders entry with Link', () => {
        const sidebar = (
            <Sidebar
                top={(sidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry sidebarState={sidebarState} link="/" aria-label="home">
                                Home
                            </SidebarEntry>
                            <SidebarEntry
                                sidebarState={sidebarState}
                                link="/tutorials"
                                aria-label="tutorials"
                            >
                                Tutorials
                            </SidebarEntry>
                        </Fragment>
                    );
                }}
            />
        );
        const { container } = render(sidebar);
        expect(container.querySelector('a')).toHaveClass(`${UI_PREFIX}__sidebar__entry`);

        // home should be active
        expect(screen.getByRole('navigation', { name: 'home' })).toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByRole('navigation', { name: 'tutorials' })).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
    });
    test('activate based on URL', () => {
        const originalGetLocation = config.getLocation;
        config.getLocation = () => ({ pathname: '/tutorials' });
        const sidebar = (
            <Sidebar
                top={(sidebarState) => {
                    return (
                        <Fragment>
                            <SidebarEntry sidebarState={sidebarState} link="/" aria-label="home">
                                Home
                            </SidebarEntry>
                            <SidebarEntry
                                sidebarState={sidebarState}
                                link="/tutorials"
                                aria-label="tutorials"
                            >
                                Tutorials
                            </SidebarEntry>
                        </Fragment>
                    );
                }}
            />
        );
        // If navigation changes to tutorials location, it should be active on /tutorials page
        render(sidebar);
        expect(screen.getByRole('navigation', { name: 'home' })).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByRole('navigation', { name: 'tutorials' })).toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        config.getLocation = originalGetLocation;
    });
});
