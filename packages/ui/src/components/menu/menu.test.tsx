import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Menu } from './Menu';
import { UI_PREFIX } from '../../config';

describe('Menu', () => {
    test('renders with entries', () => {
        const entries = [
            { type: 'entry' as const, label: 'First' },
            { type: 'divider' as const },
            { type: 'entry' as const, label: 'Second' },
        ];
        render(<Menu entries={entries} data-testid="menu" />);

        const e1 = screen.getByText('First');
        const e2 = screen.getByText('Second');
        const d = screen.getByTestId('menu-divider');

        expect(e1).toBeInTheDocument();
        expect(e2).toBeInTheDocument();
        expect(d).toBeInTheDocument();

        const menu = screen.getByTestId('menu');
        expect(menu).toHaveClass(`${UI_PREFIX}__menu`);
    });

    test('renders without entries', () => {
        render(<Menu data-testid="menu" />);

        const menu = screen.getByTestId('menu');
        expect(menu).toBeEmptyDOMElement();
    });

    test('passes props to entries', async () => {
        const onClick = jest.fn();

        const entries = [
            { type: 'entry' as const, label: 'First', props: { disabled: true } },
            { type: 'entry' as const, label: 'Second', props: { onClick } },
        ];
        render(<Menu entries={entries} data-testid="menu" />);

        const e1 = screen.getByText('First');
        const e2 = screen.getByText('Second');

        expect(e1).toHaveClass(`${UI_PREFIX}__menu__entry--disabled`);
        expect(e2).toBeInTheDocument();

        await userEvent.click(e2);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
