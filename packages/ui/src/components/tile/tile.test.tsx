import React from 'react';
import { render, screen } from '@testing-library/react';

import { Tile } from './Tile';
import { UI_PREFIX } from '../../config';

describe('Tile', () => {
    test('renders with all elements', () => {
        render(
            <Tile description="This is the description" data-testid="tile">
                Content
            </Tile>
        );

        expect(screen.getByTestId('tile')).toHaveClass(`${UI_PREFIX}__tile`);
    });
    test('renders with backgorund class and custom class', () => {
        render(
            <Tile
                data-testid="tile"
                description="description"
                withBackground={true}
                className="extra-class"
            >
                Content
            </Tile>
        );

        expect(screen.getByTestId('tile')).toHaveClass(`${UI_PREFIX}__tile`);
        expect(screen.getByTestId('tile')).toHaveClass(`${UI_PREFIX}__tile--with-background`);
        expect(screen.getByTestId('tile')).toHaveClass('extra-class');
    });

    test('renders with a custom tag', () => {
        const { container } = render(
            <Tile description="This is the description" data-testid="tile" tag="a">
                Content
            </Tile>
        );

        expect(container.querySelector('a')).toHaveClass(`${UI_PREFIX}__tile`);
    });
});
