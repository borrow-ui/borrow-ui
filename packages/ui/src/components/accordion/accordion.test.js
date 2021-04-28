import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../config';

import { Accordion } from './Accordion';

describe('Accordion', () => {
    test('renders title and content', () => {
        render(<Accordion title="Test Title">Mighty Content</Accordion>);
        const title = screen.getByText('Test Title');
        const content = screen.getByText('Mighty Content');

        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title`);
        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title--closed`);
        expect(content).toHaveClass(`${UI_PREFIX}__accordion__content`);
        expect(content).toHaveClass(`${UI_PREFIX}__accordion__content--closed`);
    });

    test('on title click opens the content', async () => {
        render(<Accordion title="Test Title">Mighty Content</Accordion>);
        const title = screen.getByText('Test Title');
        const content = screen.getByText('Mighty Content');

        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title--closed`);
        expect(content).toHaveClass(`${UI_PREFIX}__accordion__content--closed`);

        await userEvent.click(title);

        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title--open`);
        expect(content).toHaveClass(`${UI_PREFIX}__accordion__content--open`);
    });

    test('on title click opens the content AND calls onClick in titleProps', async () => {
        const onClick = jest.fn();
        render(
            <Accordion title="Test Title" titleProps={{ onClick }}>
                Mighty Content
            </Accordion>
        );
        const title = screen.getByText('Test Title');

        await userEvent.click(title);

        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title--open`);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('content with maxHeight', async () => {
        render(
            <Accordion title="Test Title" maxHeight={200}>
                Mighty Content
            </Accordion>
        );
        const title = screen.getByText('Test Title');
        const content = screen.getByText('Mighty Content');

        await userEvent.click(title);

        expect(content).toHaveStyle(`max-height: 200px`);
    });

    test('initialStatus is open', async () => {
        render(
            <Accordion title="Test Title" initialStatus="open">
                Mighty Content
            </Accordion>
        );
        const title = screen.getByText('Test Title');
        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title--open`);

        await userEvent.click(title);

        expect(title).toHaveClass(`${UI_PREFIX}__accordion__title--closed`);
    });
});
