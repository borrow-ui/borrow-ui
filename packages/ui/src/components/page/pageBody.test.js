import React from 'react';
import { render, screen } from '@testing-library/react';

import { PageBody } from './PageBody';
import { UI_PREFIX } from '../../config';

describe('PageBody', () => {
    test('renders', () => {
        render(<PageBody>The content</PageBody>);

        expect(screen.getByText('The content')).toHaveClass(`${UI_PREFIX}__page__body`);
    });
});
