import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { ReactSelect } from './ReactSelect';

const options = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Fourth' },
];

describe('ReactSelect', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [value, setValue] = useState<number | null>(null);

            return (
                <>
                    <ReactSelect
                        onChange={(v: { value: number | null }) => setValue(v.value)}
                        options={options}
                    />
                    <div data-testid="selected-value">{value}</div>
                </>
            );
        };
        const { container } = render(<Form />);

        // data-testid is not supported by Select
        const select = container.querySelector(`.${UI_PREFIX}__form__field__react-select`);
        expect(select).toBeInTheDocument();

        await userEvent.type(screen.getByRole('combobox'), 'Th');
        await userEvent.click(screen.getByText('Third'));

        expect(screen.getByTestId('selected-value')).toHaveTextContent('3');
    });

    test('has an invalid class', () => {
        const { container } = render(<ReactSelect options={options} invalid={true} />);

        const select = container.querySelector(`.${UI_PREFIX}__form__field__react-select`);
        expect(select).toHaveClass(`${UI_PREFIX}__form__field__react-select--invalid`);
    });

    test('renders with an initial value', () => {
        const Form = () => {
            const [value, setValue] = useState<number | null>(2);

            return (
                <>
                    <ReactSelect
                        onChange={(v: { value: number | null }) => setValue(v.value)}
                        options={options}
                        value={value}
                    />
                    <div data-testid="selected-value">{value}</div>
                </>
            );
        };
        const { container } = render(<Form />);

        const singleValue = container.querySelector(
            `.${UI_PREFIX}__form__field__react-select__single-value`
        );

        expect(singleValue).toHaveTextContent('Second');
    });

    test('renders with an initial values in multi select and can be changed', async () => {
        const Form = () => {
            const [values, setValues] = useState<Array<number>>([1, 3]);

            return (
                <>
                    <ReactSelect
                        isMulti={true}
                        onChange={(vs: Array<{ value: number }>) =>
                            setValues(vs.map((v) => v.value))
                        }
                        options={options}
                        value={values}
                    />
                    <div data-testid="selected-values">{values.join(',')}</div>
                </>
            );
        };
        const { container } = render(<Form />);

        expect(
            container.querySelectorAll(
                `.${UI_PREFIX}__form__field__react-select__multi-value__label`
            )[0]
        ).toHaveTextContent('First');
        expect(
            container.querySelectorAll(
                `.${UI_PREFIX}__form__field__react-select__multi-value__label`
            )[1]
        ).toHaveTextContent('Third');

        // Remove Third
        await userEvent.type(screen.getByRole('combobox'), 'Th');
        await userEvent.click(screen.getByRole('button', { name: 'Remove Third' }));
        // Add Fourth
        await userEvent.clear(screen.getByRole('combobox'));
        await userEvent.type(screen.getByRole('combobox'), 'Fou');
        await userEvent.click(screen.getByText('Fourth'));
        expect(screen.getByTestId('selected-values')).toHaveTextContent('1,4');
    });

    test('multi select auto add option if value is not in options', () => {
        const Form = () => {
            const [values, setValues] = useState<Array<number>>([1, 50]);

            return (
                <>
                    <ReactSelect
                        isMulti={true}
                        onChange={(vs: Array<{ value: number }>) =>
                            setValues(vs.map((v) => v.value))
                        }
                        options={options}
                        value={values}
                    />
                    <div data-testid="selected-values">{values.join(',')}</div>
                </>
            );
        };
        const { container } = render(<Form />);

        expect(
            container.querySelectorAll(
                `.${UI_PREFIX}__form__field__react-select__multi-value__label`
            )[0]
        ).toHaveTextContent('First');
        expect(
            container.querySelectorAll(
                `.${UI_PREFIX}__form__field__react-select__multi-value__label`
            )[1]
        ).toHaveTextContent('50');

        expect(screen.getByTestId('selected-values')).toHaveTextContent('1,50');
    });

    test('uses CreatableSelect', async () => {
        const Form = () => {
            const [value, setValue] = useState<null | number | string>(null);

            return (
                <>
                    <ReactSelect
                        creatable={true}
                        onChange={(v: { value: null | number | string }) => setValue(v.value)}
                        options={options}
                        value={value}
                    />
                    <div data-testid="selected-value">{value}</div>
                </>
            );
        };
        render(<Form />);

        await userEvent.type(screen.getByRole('combobox'), 'New One');
        await userEvent.click(screen.getAllByText(/Create/)[1]);

        expect(screen.getByTestId('selected-value')).toHaveTextContent('New One');
    });
});
