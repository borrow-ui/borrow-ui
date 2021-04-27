import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX } from '../../config';

import { Loader } from './Loader';

describe('Loader', () => {
    test('renders main laoder', () => {
        render(<Loader data-testid="loader-container" />);
        const loaderContainer = screen.getByTestId('loader-container');

        expect(loaderContainer).toHaveClass(`${UI_PREFIX}__loader__container`);
        expect(loaderContainer).toHaveClass(`${UI_PREFIX}__loader__container--full-section`);

        const loader = loaderContainer.querySelector('div');
        expect(loader).toHaveClass(`${UI_PREFIX}__loader`);
        expect(loader).toHaveClass(`${UI_PREFIX}__loader--full-section`);
    });

    test('renders inline laoder', () => {
        render(<Loader type="inline" data-testid="inline-loader-container" />);
        const loaderContainer = screen.getByTestId('inline-loader-container');

        expect(loaderContainer).toHaveClass(`${UI_PREFIX}__loader__container`);
        expect(loaderContainer).toHaveClass(`${UI_PREFIX}__loader__container--inline`);

        const loader = loaderContainer.querySelector('div');
        expect(loader).toHaveClass(`${UI_PREFIX}__loader`);
        expect(loader).toHaveClass(`${UI_PREFIX}__loader--inline`);
    });
});
