import React from 'react';
import { render, screen } from '@testing-library/react';

import { TileLink } from './TileLink';
import { UI_PREFIX } from '../../config';

describe('Tile', () => {
    test('renders with all elements', () => {
        const { container } = render(
            // @ts-ignore
            <TileLink
                description="This is the description"
                to="/app"
                icon="person"
                data-testid="tile-link"
            >
                Content
            </TileLink>
        );

        expect(screen.getByTestId('tile-link')).toHaveClass(`${UI_PREFIX}__tile-link`);

        // Adjust icon height: small tile, big icon, otherwise huge icon
        expect(container.querySelector('i.person')).toHaveClass(`${UI_PREFIX}__icon--big`);
    });

    test('renders as a "a" with a big icon', () => {
        const { container } = render(
            // @ts-ignore
            <TileLink
                className="my-tile-class"
                description="My homepage"
                href="/go/there/"
                icon="home"
                size="big"
                data-testid="tile-link"
                iconProps={{ className: 'my-class' }}
            >
                Home
            </TileLink>
        );
        expect(screen.getByTestId('tile-link')).toHaveClass(`my-tile-class`);
        expect(container.querySelector('i.home')).toHaveClass(`${UI_PREFIX}__icon--huge`);
        expect(container.querySelector('i.home')).toHaveClass('my-class');
        expect(container.querySelector(`a.${UI_PREFIX}__tile-link__link`)).toBeInTheDocument();
    });
});
