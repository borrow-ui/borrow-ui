import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { NavbarLink } from './NavbarLink';

describe('NavbarLink', () => {
    test('renders the component with the proper class', () => {
        render(<NavbarLink className="test-class">I am a link</NavbarLink>);

        expect(screen.queryByText('I am a link')).toBeInTheDocument();

        const navbarLink = screen.getByText('I am a link');
        // should have default classes and the one added
        expect(navbarLink).toHaveClass(`${UI_PREFIX}__navbar__link`);
        expect(navbarLink).toHaveClass(`test-class`);
    });
});
