import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { a11yClickableElement } from './a11y';

describe('a11yClickableElement', () => {
    test('calls onClick', async () => {
        const user = userEvent.setup();
        const testOnClick = jest.fn();

        const Test = () => {
            return <div {...a11yClickableElement({ onClick: testOnClick })}>test</div>;
        };
        render(<Test />);

        const div = screen.getByRole('button');

        await user.click(div);
        expect(testOnClick).toHaveBeenCalledTimes(1);
    });

    test('trigger onClick when Enter is pressed', async () => {
        const testOnClick = jest.fn();

        const Test = () => {
            return <div {...a11yClickableElement({ onClick: testOnClick })}>test</div>;
        };
        render(<Test />);

        const div = screen.getByRole('button');

        fireEvent.keyDown(div, { key: 'Enter' });
        expect(testOnClick).toHaveBeenCalledTimes(1);
    });

    test('trigger onKeyDown when Enter is pressed and onClick on click', async () => {
        const user = userEvent.setup();
        const testOnClick = jest.fn();
        const testOnKeyDown = jest.fn();

        const Test = () => {
            return (
                <div {...a11yClickableElement({ onClick: testOnClick, onKeyDown: testOnKeyDown })}>
                    test
                </div>
            );
        };
        render(<Test />);

        const div = screen.getByRole('button');

        await user.click(div);
        fireEvent.keyDown(div, { key: 'Enter' });

        expect(testOnClick).toHaveBeenCalledTimes(1);
        expect(testOnKeyDown).toHaveBeenCalledTimes(1);
    });

    test('can specify tabIndex', async () => {
        const Test = () => {
            return <div {...a11yClickableElement({ onClick: () => {}, tabIndex: 2 })}>test</div>;
        };
        render(<Test />);

        const div = screen.getByRole('button');
        expect(div.tabIndex).toBe(2);
    });
});
