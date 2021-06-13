import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { Toggle } from './Toggle';

describe('Toggle', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [checked, setChecked] = useState(false);

            return (
                <>
                    <Toggle checked={checked} onClick={() => setChecked(!checked)} />
                    <span>{checked ? 'I am checked' : 'I am not checked'}</span>
                </>
            );
        };
        render(<Form />);

        const toggle = screen.getAllByRole('checkbox')[0];
        expect(toggle).toHaveClass(`${UI_PREFIX}__form__field__toggle`);

        // changes status when clicked
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
        await userEvent.click(toggle);
        expect(screen.queryByText('I am not checked')).not.toBeInTheDocument();
        expect(screen.getByText('I am checked')).toBeInTheDocument();

        // can be changed also by pressing spacebar
        await fireEvent.keyDown(toggle, { keyCode: 32, code: 'Space' });
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
    });

    test('renders disabled with classes', async () => {
        const Form = () => {
            const [checked, setChecked] = useState(false);

            return (
                <>
                    <Toggle
                        checked={checked}
                        onClick={() => setChecked(!checked)}
                        disabled={true}
                    />
                    <span>{checked ? 'I am checked' : 'I am not checked'}</span>
                </>
            );
        };
        const { container } = render(<Form />);

        const toggle = screen.getAllByRole('checkbox')[0];
        expect(toggle).toHaveClass(`${UI_PREFIX}__form__field__toggle`);
        expect(container.querySelector(`.${UI_PREFIX}__form__field__toggle`)).toHaveClass(
            `${UI_PREFIX}__form__field__toggle--disabled`
        );
        expect(container.querySelector(`.${UI_PREFIX}__form__field__toggle__switch`)).toHaveClass(
            `${UI_PREFIX}__form__field__toggle__switch--disabled`
        );

        // does not changes status when clicked
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
        await userEvent.click(toggle);
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
    });
});
