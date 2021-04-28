import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX, setConfig, config } from '../../config';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
    test('renders two links and one label', () => {
        const breadcrumbs = [
            { link: '/', label: 'Home' },
            { link: '/app', label: 'App' },
            { label: 'List' },
        ];
        render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

        const home = screen.getByText('Home');
        expect(home).toHaveClass(`${UI_PREFIX}__breadcrumbs__breadcrumb`);
        expect(home).toHaveClass(`${UI_PREFIX}__breadcrumbs__breadcrumb--clickable`);
        const app = screen.getByText('App');
        expect(app).toHaveClass(`${UI_PREFIX}__breadcrumbs__breadcrumb--clickable`);
        const list = screen.getByText('List');
        expect(list).toHaveClass(`${UI_PREFIX}__breadcrumbs__breadcrumb`);
        expect(list).toHaveClass(`${UI_PREFIX}__breadcrumbs__breadcrumb--last`);
    });

    test('renders only the container with no breadcrumbs', () => {
        render(<Breadcrumbs breadcrumbs={null}>Text</Breadcrumbs>);

        const text = screen.getByText('Text');
        expect(text).toHaveClass(`${UI_PREFIX}__breadcrumbs`);
        expect(screen.queryAllByTestId('breadcrumb').length).toBe(0);
    });

    test('uses link component from config', () => {
        const getLink = config.getLinkComponent;

        setConfig('getLinkComponent', () => 'span');
        const breadcrumbs = [{ link: '/', label: 'Home' }, { label: 'List' }];
        const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

        const span = container.querySelector('span');
        expect(span).toHaveTextContent('Home');
        setConfig('getLinkComponent', getLink);
    });

    test('uses a custom tag for breadcrumb', () => {
        const breadcrumbs = [{ link: '/', label: 'Home', tag: 'abbr' }, { label: 'List' }];
        const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

        const span = container.querySelector('abbr');
        expect(span).toHaveTextContent('Home');
    });

    test('allows to set onClick for breadcrumb', async () => {
        const onClick = jest.fn();
        const breadcrumbs = [{ link: '/', label: 'Home', onClick }, { label: 'List' }];
        render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

        const home = screen.getByText('Home');
        await userEvent.click(home);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
