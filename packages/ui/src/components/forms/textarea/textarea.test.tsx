import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { Textarea } from './Textarea';

describe('Textarea', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [text, setText] = useState('');

            return (
                <div>
                    <Textarea
                        data-testid="textarea"
                        onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                            setText(e.currentTarget.value)
                        }
                        value={text}
                    />
                    <div data-testid="content">{text}</div>
                </div>
            );
        };
        render(<Form />);

        const textarea = screen.getByTestId('textarea');
        expect(textarea).toHaveClass(`${UI_PREFIX}__form__field__textarea`);

        await userEvent.type(textarea, 'this is the content');

        expect(screen.getByTestId('content')).toHaveTextContent('this is the content');
    });

    test('renders invalid and disabled with classes', async () => {
        const Form = () => {
            const [text, setText] = useState('initial');

            return (
                <div>
                    <Textarea
                        data-testid="textarea"
                        onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                            setText(e.currentTarget.value)
                        }
                        value={text}
                        invalid={true}
                        disabled={true}
                    />
                    <div data-testid="content">{text}</div>
                </div>
            );
        };
        render(<Form />);

        const textarea = screen.getByTestId('textarea');
        expect(textarea).toHaveClass(`${UI_PREFIX}__form__field__textarea--disabled`);
        expect(textarea).toHaveClass(`${UI_PREFIX}__form__field__textarea--invalid`);

        // typing does not cause a change if disabled
        await userEvent.type(textarea, 'this is the content');

        expect(screen.getByTestId('content')).toHaveTextContent('initial');
    });
});
