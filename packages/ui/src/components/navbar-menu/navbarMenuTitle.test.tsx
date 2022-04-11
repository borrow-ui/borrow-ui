import React from 'react';
import { render, screen } from '@testing-library/react';

import { NavbarMenuTitle } from './NavbarMenuTitle';
import { UI_PREFIX } from '../../config';

describe('NavbarMenuTitle', () => {
    test('renders', () => {
        render(<NavbarMenuTitle className="test-class">Title sample</NavbarMenuTitle>);

        const title = screen.getByText('Title sample');
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass(`${UI_PREFIX}__navbar-menu__title`);
        expect(title).toHaveClass(`test-class`);
    });
});
