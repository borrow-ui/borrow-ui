import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [checked, setChecked] = useState(false);

            return (
                <Checkbox
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                    label={checked ? 'I am checked' : 'I am not checked'}
                />
            );
        };
        render(<Form />);

        const checkbox = screen.getAllByRole('checkbox')[0];
        expect(checkbox).toHaveClass(`${UI_PREFIX}__form__field__checkbox__container`);

        // changes status when clicked
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
        await userEvent.click(checkbox);
        expect(screen.queryByText('I am not checked')).not.toBeInTheDocument();
        expect(screen.getByText('I am checked')).toBeInTheDocument();

        // can be changed also by pressing spacebar
        await fireEvent.keyDown(checkbox, { keyCode: 32, code: 'Space' });
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
    });

    test('renders disabled with classes', async () => {
        const Form = () => {
            const [checked, setChecked] = useState(false);

            return (
                <Checkbox
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                    label={checked ? 'I am checked' : 'I am not checked'}
                    disabled={true}
                />
            );
        };
        const { container } = render(<Form />);

        const checkbox = screen.getAllByRole('checkbox')[0];
        expect(checkbox).toHaveClass(`${UI_PREFIX}__form__field__checkbox__container`);
        expect(container.querySelector(`.${UI_PREFIX}__form__field__checkbox`)).toHaveClass(
            `${UI_PREFIX}__form__field__checkbox--disabled`
        );
        expect(
            container.querySelector(`.${UI_PREFIX}__form__field__checkbox__indicator`)
        ).toHaveClass(`${UI_PREFIX}__form__field__checkbox__indicator--disabled`);
        expect(container.querySelector(`.${UI_PREFIX}__form__field__checkbox__label`)).toHaveClass(
            `${UI_PREFIX}__form__field__checkbox__label--disabled`
        );

        // does not changes status when clicked
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
        await userEvent.click(checkbox);
        expect(screen.getByText('I am not checked')).toBeInTheDocument();
        expect(screen.queryByText('I am checked')).not.toBeInTheDocument();
    });
});
