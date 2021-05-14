import React from 'react';
import { render, screen } from '@testing-library/react';

import { SidebarMenu } from './SidebarMenu';
import { UI_PREFIX } from '../../config';

describe('SidebarMenu', () => {
    test('renders with entries', () => {
        render(
            <SidebarMenu data-testid="sidebar-menu">
                <SidebarMenu.Title>My Menu</SidebarMenu.Title>
                <SidebarMenu.Entry isActive={true}>One entry</SidebarMenu.Entry>
                <SidebarMenu.Separator data-testid="separator" />
                <SidebarMenu.Entry>Another value</SidebarMenu.Entry>
            </SidebarMenu>
        );

        expect(screen.getByTestId('sidebar-menu')).toHaveClass(`${UI_PREFIX}__sidebar-menu`);
        expect(screen.getByTestId('sidebar-menu')).toHaveClass(
            `${UI_PREFIX}__sidebar-menu--padded`
        );
        expect(screen.getByText('My Menu')).toHaveClass(`${UI_PREFIX}__sidebar-menu__title`);
        expect(screen.getByText('One entry')).toHaveClass(`${UI_PREFIX}__sidebar-menu__entry`);
        expect(screen.getByText('One entry')).toHaveClass(
            `${UI_PREFIX}__sidebar-menu__entry--active`
        );
        expect(screen.getByTestId('separator')).toHaveClass(
            `${UI_PREFIX}__sidebar-menu__separator`
        );
    });
    test('renders without padding', () => {
        render(
            <SidebarMenu data-testid="sidebar-menu" padded={false}>
                <SidebarMenu.Entry>One entry</SidebarMenu.Entry>
            </SidebarMenu>
        );

        expect(screen.getByTestId('sidebar-menu')).not.toHaveClass(
            `${UI_PREFIX}__sidebar-menu--padded`
        );
    });
    test('renders Title and Entry as links if href is passed', () => {
        render(
            <SidebarMenu>
                <SidebarMenu.Title href="/">My Menu</SidebarMenu.Title>
                <SidebarMenu.Entry href="/entry">One entry</SidebarMenu.Entry>
            </SidebarMenu>
        );
        expect(screen.getByText('My Menu', { selector: 'a' })).toBeInTheDocument();
        expect(screen.getByText('My Menu')).toHaveClass(
            `${UI_PREFIX}__sidebar-menu__title--clickable`
        );
        expect(screen.getByText('One entry', { selector: 'a' })).toBeInTheDocument();
        expect(screen.getByText('One entry')).toHaveClass(
            `${UI_PREFIX}__sidebar-menu__entry--clickable`
        );
    });
    test('renders Title and Entry with a custom tag', () => {
        render(
            <SidebarMenu>
                <SidebarMenu.Title tag="span">My Menu</SidebarMenu.Title>
                <SidebarMenu.Entry tag="span">One entry</SidebarMenu.Entry>
            </SidebarMenu>
        );
        expect(screen.getByText('My Menu', { selector: 'span' })).toBeInTheDocument();
        expect(screen.getByText('One entry', { selector: 'span' })).toBeInTheDocument();
    });
});
