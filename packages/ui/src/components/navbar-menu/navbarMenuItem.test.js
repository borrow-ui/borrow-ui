import React from 'react';
import { render, screen } from '@testing-library/react';

import { NavbarMenuItem } from './NavbarMenuItem';
import { UI_PREFIX } from '../../config';

describe('NavbarMenuTitle', () => {
    test('renders', () => {
        render(
            <NavbarMenuItem
                label="Item"
                labelProps={{ className: 'label-class' }}
                description="This is a test"
                descriptionProps={{ className: 'description-class' }}
            />
        );

        const label = screen.getByText('Item');
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass(`${UI_PREFIX}__navbar-menu__item__label`);
        expect(label).toHaveClass(`label-class`);
        const description = screen.getByText('This is a test');
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass(`${UI_PREFIX}__navbar-menu__item__description`);
        expect(description).toHaveClass(`description-class`);
    });
    test('renders with custom tag', () => {
        const { container } = render(
            <NavbarMenuItem
                tag="a"
                label="Item"
                description="This is a test"
                className="test-class"
            />
        );

        expect(screen.getByText('Item')).toBeInTheDocument();
        expect(screen.getByText('This is a test')).toBeInTheDocument();
        expect(container.querySelector('a')).toHaveClass(`${UI_PREFIX}__navbar-menu__item`);
        expect(container.querySelector('a')).toHaveClass('test-class');
    });
});
