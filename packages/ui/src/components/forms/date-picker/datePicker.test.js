import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';

import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [date, setDate] = useState(null);

            return (
                <>
                    <DatePicker
                        onDayChange={(d) => setDate(d)}
                        selectedDays={date}
                        inputProps={{ 'data-testid': 'date-input' }}
                    />
                    <div data-testid="selected-date">{date}</div>
                </>
            );
        };
        render(<Form />);

        const dateInput = screen.getByTestId('date-input');
        expect(dateInput).toHaveClass(`${UI_PREFIX}__form__field__input`);

        await userEvent.type(dateInput, '2021-05');
        expect(screen.getByTestId('selected-date')).toHaveTextContent('2021-05');

        await userEvent.type(dateInput, '-25');
        expect(screen.getByTestId('selected-date')).toHaveTextContent('2021-05-25');
    });

    test('set the date as a date object', async () => {
        const setDate = jest.fn();
        render(<DatePicker onDayChange={(d) => setDate(d)} onDayChangeFormat="date" />);

        const dateInput = screen.getByRole('textbox');

        await userEvent.type(dateInput, '2021-05-25');
        expect(setDate).toHaveBeenLastCalledWith(new Date('2021-05-25T12:00:00.000'));
    });

    test('uses a differnt format', async () => {
        const setDate = jest.fn();
        render(
            <DatePicker
                onDayChange={(d) => setDate(d)}
                onDayChangeFormat="date"
                format="DD-MM-YYYY"
            />
        );

        const dateInput = screen.getByRole('textbox');

        await userEvent.type(dateInput, '25-05-2021');
        expect(setDate).toHaveBeenLastCalledWith(new Date('2021-05-25T12:00:00.000'));
    });

    test('does not return partial values', async () => {
        const setDate = jest.fn();
        render(<DatePicker onDayChange={(d) => setDate(d)} returnPartial={false} />);

        const dateInput = screen.getByRole('textbox');

        await userEvent.type(dateInput, '2021-05-25');
        expect(setDate).toHaveBeenCalledTimes(1);
    });

    test('can be set with an initial date', () => {
        render(<DatePicker initialValue="2021-05-25" />);

        const dateInput = screen.getByRole('textbox');
        expect(dateInput).toHaveValue('2021-05-25');
    });

    test('can be invalid', () => {
        render(<DatePicker initialValue="2021-05-25" invalid={true} />);

        const dateInput = screen.getByRole('textbox');
        expect(dateInput).toHaveValue('2021-05-25');
        expect(dateInput).toHaveClass(`${UI_PREFIX}__form__field__input--invalid`);
    });

    test('can be disabled', async () => {
        const setDate = jest.fn();
        render(
            <DatePicker onDayChange={(d) => setDate(d)} initialValue="2021-05-25" disabled={true} />
        );

        const dateInput = screen.getByRole('textbox');

        await userEvent.type(dateInput, '2021-06-23');
        expect(setDate).toHaveBeenCalledTimes(0);
        expect(dateInput).toHaveClass(`${UI_PREFIX}__form__field__input--disabled`);
    });

    test('calls formatDate when changed via overlay', async () => {
        const setDate = jest.fn();
        render(<DatePicker onDayChange={(d) => setDate(d)} initialValue="2021-05-25" />);

        const dateInput = screen.getByRole('textbox');

        await userEvent.click(dateInput);

        // get 21st of month
        const day = screen.getByText('21');
        await userEvent.click(day);

        expect(setDate).toHaveBeenCalledWith('2021-05-21');
    });

    test('does not do anything if onDayChange is not set', async () => {
        render(<DatePicker initialValue="2021-05-25" />);

        const dateInput = screen.getByRole('textbox');

        await userEvent.click(dateInput);
        const day = screen.getByText('21');
        await userEvent.click(day);
    });
});
