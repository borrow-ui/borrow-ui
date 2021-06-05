import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { Input } from './Input';

describe('Input', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [text, setText] = useState('');

            return (
                <div>
                    <Input
                        data-testid="input"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                    <div data-testid="content">{text}</div>
                </div>
            );
        };
        render(<Form />);

        const input = screen.getByTestId('input');
        expect(input).toHaveClass(`${UI_PREFIX}__form__field__input`);

        await userEvent.type(input, 'this is the content');

        expect(screen.getByTestId('content')).toHaveTextContent('this is the content');
    });

    test('renders invalid and disabled with classes', async () => {
        const Form = () => {
            const [text, setText] = useState('initial');

            return (
                <div>
                    <Input
                        data-testid="input"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        invalid={true}
                        disabled={true}
                    />
                    <div data-testid="content">{text}</div>
                </div>
            );
        };
        render(<Form />);

        const input = screen.getByTestId('input');
        expect(input).toHaveClass(`${UI_PREFIX}__form__field__input--disabled`);
        expect(input).toHaveClass(`${UI_PREFIX}__form__field__input--invalid`);

        // typing does not cause a change if disabled
        await userEvent.type(input, 'this is the content');

        expect(screen.getByTestId('content')).toHaveTextContent('initial');
    });
});
