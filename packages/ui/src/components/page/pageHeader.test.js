import React from 'react';
import { render, screen } from '@testing-library/react';

import { PageHeader } from './PageHeader';
import { UI_PREFIX } from '../../config';

describe('PageHeader', () => {
    test('renders', () => {
        render(
            <PageHeader data-testid="header">
                <h4>My Page</h4>
            </PageHeader>
        );

        const header = screen.getByTestId('header');
        expect(header).toHaveClass(`${UI_PREFIX}__page__header`);
    });
});
