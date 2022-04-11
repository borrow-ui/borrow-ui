import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Badge } from './Badge';

describe('Badge', () => {
    test('renders children', () => {
        render(<Badge>value</Badge>);
        const value = screen.getByText('value');

        expect(value).toHaveClass(`${UI_PREFIX}__badge`);
    });

    test('set two classes for a color', () => {
        render(<Badge color="primary">value</Badge>);
        const value = screen.getByText('value');

        expect(value).toHaveClass(`color-on-primary`);
        expect(value).toHaveClass(`color-primary-bg`);
    });

    test('no color', () => {
        render(<Badge color="">value</Badge>);
        const value = screen.getByText('value');

        expect(value).not.toHaveClass(`color-on-neutral`);
    });

    test('type not squared', () => {
        render(<Badge type="squared">value</Badge>);
        const value = screen.getByText('value');

        expect(value).not.toHaveClass(`${UI_PREFIX}__badge--squared`);

        render(<Badge type="rounded">value rounded</Badge>);
        const valueRounded = screen.getByText('value rounded');

        expect(valueRounded).toHaveClass(`${UI_PREFIX}__badge--rounded`);
    });

    test('to have a clickable class if onClick is passed', () => {
        render(<Badge onClick={() => {}}>value</Badge>);
        const value = screen.getByText('value');

        expect(value).toHaveClass(`${UI_PREFIX}__badge--clickable`);
    });
});
