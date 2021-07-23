import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useSidebar } from './Sidebar';
import { CONTENT_REQUIRES_ID } from './SidebarEntry';
import { UI_PREFIX } from '../../config';

describe('Sidebar', () => {
    test('renders a Sidebar with entries with content', async () => {
        const { Sidebar, SidebarEntry } = useSidebar();
        const { container } = render(
            <Sidebar data-testid="sidebar">
                <SidebarEntry
                    data-testid="with-content"
                    id="with-content"
                    content={<div>Content</div>}
                    entryClickToggleContent={true}
                >
                    With content
                </SidebarEntry>
                <SidebarEntry
                    data-testid="another-content"
                    id="another-content"
                    content={<div>Content</div>}
                    entryClickToggleContent={true}
                >
                    Another content
                </SidebarEntry>
            </Sidebar>
        );
        const sidebarTrigger = screen.getByTestId('sidebar-trigger');

        expect(screen.getByTestId('with-content')).toHaveClass(`${UI_PREFIX}__sidebar__entry`);
        expect(screen.getByText('With content')).toHaveClass(`${UI_PREFIX}__sidebar__entry__label`);

        // Expand "With content"
        await userEvent.click(screen.getByText('With content'));
        expect(container.querySelector('#with-content__content')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry__content--visible`
        );

        // Open the sidebar as well
        await userEvent.click(sidebarTrigger);

        // Expand "Another content"
        await userEvent.click(screen.getByText('Another content'));
        expect(container.querySelector('#another-content__content')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry__content--visible`
        );

        // "With content" should still be expanded
        expect(container.querySelector('#with-content__content')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry__content--visible`
        );

        // Closes "Another content"
        await userEvent.click(screen.getByText('Another content'));
        expect(container.querySelector('#another-content__content')).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry__content--visible`
        );
    });
    test('throws an error if content are passed without id', () => {
        const err = console.error;
        console.error = jest.fn();

        const { Sidebar, SidebarEntry } = useSidebar();

        expect(() => {
            render(
                <Sidebar>
                    <SidebarEntry content={<div>More content</div>}>With content</SidebarEntry>
                </Sidebar>
            );
        }).toThrowError(CONTENT_REQUIRES_ID);
        console.error = err;
    });

    test('preserve entry onClick if provided', async () => {
        const testOnClick = jest.fn();

        const { Sidebar, SidebarEntry } = useSidebar();

        render(
            <Sidebar>
                <SidebarEntry
                    data-testid="with-content"
                    id="with-content"
                    content={<div>Content</div>}
                    onClick={testOnClick}
                >
                    With content
                </SidebarEntry>
            </Sidebar>
        );
        // Activate "With content"
        await userEvent.click(screen.getByText('With content'));
        // Should have called onClick as well
        expect(testOnClick).toBeCalledTimes(1);
    });

    test('reders with an entry with a shortcut', () => {
        const { Sidebar, SidebarEntry } = useSidebar();

        render(
            <Sidebar>
                <SidebarEntry shortcut="SC">Has a shortcut</SidebarEntry>
            </Sidebar>
        );
        expect(screen.getByText('SC')).toHaveClass(`${UI_PREFIX}__sidebar__entry__label__shortcut`);
    });

    test('reders entry as with a custom tag', () => {
        const { Sidebar, SidebarEntry } = useSidebar();

        const { container } = render(
            <Sidebar>
                <SidebarEntry tag="a">This is a link</SidebarEntry>
            </Sidebar>
        );
        expect(container.querySelector('a')).toHaveClass(`${UI_PREFIX}__sidebar__entry`);
    });

    test('reders a shortcut from a longer label', () => {
        const { Sidebar, SidebarEntry } = useSidebar();

        render(
            <Sidebar>
                <SidebarEntry shortcut="Long Label">This is a link</SidebarEntry>
            </Sidebar>
        );
        expect(screen.queryByText('LL')).toBeInTheDocument();
    });

    test('reders entry with entryClickToggleContent and onClick', async () => {
        const onClick = jest.fn();

        const { Sidebar, SidebarEntry } = useSidebar();

        render(
            <Sidebar>
                <SidebarEntry
                    entryClickToggleContent={true}
                    onClick={onClick}
                    content="Expand"
                    id="1"
                >
                    Entry
                </SidebarEntry>
            </Sidebar>
        );

        await userEvent.click(screen.getByText('Entry'));
        expect(screen.getByText('Expand')).toHaveClass(
            `${UI_PREFIX}__sidebar__entry__content--visible`
        );

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('reders entry with Link', () => {
        const { Sidebar, SidebarEntry } = useSidebar();

        const sidebar = (
            <Sidebar>
                <SidebarEntry to="/" aria-label="home">
                    Home
                </SidebarEntry>
                <SidebarEntry to="/tutorials" aria-label="tutorials">
                    Tutorials
                </SidebarEntry>
            </Sidebar>
        );
        const { container } = render(sidebar);
        expect(container.querySelectorAll('a')[0]).toHaveClass(`${UI_PREFIX}__sidebar__entry`);
        expect(container.querySelectorAll('a')[1]).toHaveClass(`${UI_PREFIX}__sidebar__entry`);
    });
    test('activate based on flag', () => {
        const { Sidebar, SidebarEntry } = useSidebar();

        const sidebar = (
            <Sidebar>
                <SidebarEntry to="/" aria-label="home">
                    Home
                </SidebarEntry>
                <SidebarEntry to="/tutorials" aria-label="tutorials" isActive={true}>
                    Tutorials
                </SidebarEntry>
            </Sidebar>
        );
        // If navigation changes to tutorials location, it should be active on /tutorials page
        render(sidebar);
        expect(screen.getByRole('navigation', { name: 'home' })).not.toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
        expect(screen.getByRole('navigation', { name: 'tutorials' })).toHaveClass(
            `${UI_PREFIX}__sidebar__entry--active`
        );
    });
});
