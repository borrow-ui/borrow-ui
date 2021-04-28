import React from 'react';
import { render, screen } from '@testing-library/react';

import { MenuEntry } from './MenuEntry';
import { UI_PREFIX } from '../../config';

describe('MenuEntry', () => {
    test('renders with default props', () => {
        render(<MenuEntry>Entry 1</MenuEntry>);

        const entry = screen.getByText('Entry 1');

        expect(entry).toHaveClass(`${UI_PREFIX}__menu__entry`);
    });

    test('applies disabled and clickable', () => {
        // Disabled
        render(<MenuEntry disabled={true}>Disabled</MenuEntry>);
        const disabled = screen.getByText('Disabled');
        expect(disabled).toHaveClass(`${UI_PREFIX}__menu__entry--disabled`);
        // Clickable
        render(<MenuEntry onClick={() => {}}>Clickable</MenuEntry>);
        const clickable = screen.getByText('Clickable');
        expect(clickable).toHaveClass(`${UI_PREFIX}__menu__entry--clickable`);
        // Disabled with Clickable should be only disabled
        render(
            <MenuEntry onClick={() => {}} disabled={true}>
                Clickable Disabled
            </MenuEntry>
        );
        const clickableDisabled = screen.getByText('Clickable Disabled');
        expect(clickableDisabled).toHaveClass(`${UI_PREFIX}__menu__entry--disabled`);
        expect(clickableDisabled).not.toHaveClass(`${UI_PREFIX}__menu__entry--clickable`);
    });
});
