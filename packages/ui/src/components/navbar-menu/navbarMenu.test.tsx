import React from 'react';
import { render, screen } from '@testing-library/react';

import { NavbarMenu } from './NavbarMenu';
import { UI_PREFIX } from '../../config';

describe('NavbarMenu', () => {
    test('renders with entries', () => {
        const entries = [
            { label: 'First', description: 'The list of items' },
            { label: 'Settings', description: 'Security notifications' },
            { label: 'Menu Item' },
        ];
        render(<NavbarMenu title="Test Menu" entries={entries} data-testid="navbar-menu" />);

        expect(screen.getByText('First')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Menu Item')).toBeInTheDocument();

        const navbarMenu = screen.getByTestId('navbar-menu');
        expect(navbarMenu).toHaveClass(`${UI_PREFIX}__navbar-menu`);

        expect(screen.getByText('Test Menu')).toHaveClass(`${UI_PREFIX}__navbar-menu__title`);
        expect(screen.getByText('First')).toHaveClass(`${UI_PREFIX}__navbar-menu__item__label`);
        expect(screen.getByText('The list of items')).toHaveClass(
            `${UI_PREFIX}__navbar-menu__item__description`
        );
    });
});
