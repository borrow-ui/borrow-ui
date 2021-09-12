import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Loader } from './Loader';

describe('Loader', () => {
    test('renders triangle laoder', () => {
        render(<Loader data-testid="loader" />);

        const loader = screen.getByTestId('loader');
        expect(loader).toHaveClass(`${UI_PREFIX}__loader`);
        expect(loader).toHaveClass(`${UI_PREFIX}__loader--triangle`);
    });

    test('renders line laoder', () => {
        render(<Loader tyle="line" data-testid="loader" />);

        const loader = screen.getByTestId('loader');
        expect(loader).toHaveClass(`${UI_PREFIX}__loader`);
        expect(loader).toHaveClass(`${UI_PREFIX}__loader--line`);
    });

    test('renders inline laoder', () => {
        render(<Loader type="inline" data-testid="loader" />);

        const loader = screen.getByTestId('loader');
        expect(loader).toHaveClass(`${UI_PREFIX}__loader`);
        expect(loader).toHaveClass(`${UI_PREFIX}__loader--inline`);
    });
});
