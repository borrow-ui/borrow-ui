import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Icon, ICON_DEFAULT_FAMILY } from './Icon';

describe('Icon', () => {
    test('renders one icon', () => {
        render(<Icon name="home" data-testid="icon" />);

        const icon = screen.getByTestId('icon');
        expect(icon).toHaveClass(`${UI_PREFIX}__icon`);
        expect(icon).toHaveClass('home');
        // has default family
        expect(icon).toHaveClass(ICON_DEFAULT_FAMILY);

        // renders font-awesome icons
        render(<Icon name="fa-awesome" family="fas" data-testid="fa-icon" />);
        const faIcon = screen.getByTestId('fa-icon');
        expect(faIcon).toHaveClass('fas');
        expect(faIcon).toHaveClass('fa-awesome');
    });

    test('apply modifiers', () => {
        // renders size
        render(<Icon name="tiny" size="smaller" data-testid="small-icon" />);
        const smallIcon = screen.getByTestId('small-icon');
        expect(smallIcon).toHaveClass(`${UI_PREFIX}__icon--smaller`);

        // renders a single modifier
        render(<Icon name="tiny" modifiers="clickable" data-testid="clickable-icon" />);
        const clickableIcon = screen.getByTestId('clickable-icon');
        expect(clickableIcon).toHaveClass(`${UI_PREFIX}__icon--clickable`);
    });

    test('adds clickable modifiers if onClick is passed', () => {
        render(<Icon name="home" onClick={() => {}} data-testid="icon" />);

        const icon = screen.getByTestId('icon');
        expect(icon).toHaveClass(`${UI_PREFIX}__icon--clickable`);
    });
});
