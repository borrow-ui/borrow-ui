import React from 'react';
import { render, screen } from '@testing-library/react';

import { UI_PREFIX, config, setConfig } from '../../config';

import { Link } from './Link';

describe('Link', () => {
    test('renders the children with config tag', () => {
        render(<Link to="/app">App</Link>);
        const link = screen.getByText('App');

        expect(link).toHaveClass(`${UI_PREFIX}__link`);
        expect(link).toHaveClass(`${UI_PREFIX}__link--underline`);

        // Uses the config getLinkComponent
        const getLink = config.getLinkComponent;
        setConfig('getLinkComponent', () => 'span');
        const { container } = render(<Link to="/app">App</Link>);
        const span = container.querySelector('span');
        expect(span).toHaveTextContent('App');
        setConfig('getLinkComponent', getLink);
    });

    test('renders without underline', () => {
        render(
            <Link to="/app" underline={false}>
                App
            </Link>
        );
        const link = screen.getByText('App');

        expect(link).toHaveClass(`${UI_PREFIX}__link`);
        expect(link).toHaveClass(`${UI_PREFIX}__link--no-underline`);
    });
});
