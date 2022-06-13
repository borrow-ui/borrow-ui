import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UI_PREFIX } from '../../../config';
import { TestableDiv, TestableInput } from '../../../utils/sharedTypes';

import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
    test('renders and can be changed', async () => {
        const Form = () => {
            const [date, setDate] = useState<Date | undefined | string>();
            return (
                <>
                    <DatePicker onDayChange={(d) => setDate(d)} />
                    <div data-testid="selected-date">
                        {typeof date === 'object' ? date?.toISOString() : date}
                    </div>
                </>
            );
        };
        render(<Form />);

        const dateInput = screen.getByRole('textbox');
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
                format="dd-MM-yyyy"
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
        setDate.mockReset();

        await userEvent.type(dateInput, '2021-06-23');
        expect(setDate).toHaveBeenCalledTimes(0);
        expect(dateInput).toHaveClass(`${UI_PREFIX}__form__field__input--disabled`);
    });

    test('calls formatDate when changed via overlay', async () => {
        const setDate = jest.fn();
        render(<DatePicker onDayChange={(d) => setDate(d)} initialValue="2021-05-25" />);

        const dateIcon = screen.getByRole('button');

        await userEvent.click(dateIcon);

        // get 21st of month
        await userEvent.click(screen.getByText('21'));
        expect(setDate).toHaveBeenCalledWith('2021-05-21');

        // call formatDate with empty string when deselected
        await userEvent.click(dateIcon);
        await userEvent.click(screen.getByText('21'));
        expect(setDate).toHaveBeenCalledWith(undefined);
    });

    test('parseDate returns only valid dates', async () => {
        const setDate = jest.fn();
        render(
            <DatePicker
                onDayChange={(d) => setDate(d)}
                initialValue="2021-05-25"
                returnPartial={false}
            />
        );

        const dateInput = screen.getByRole('textbox');
        await userEvent.clear(dateInput);
        await userEvent.type(dateInput, '2021-07-06');
        expect(setDate).toHaveBeenCalledWith('2021-07-06');

        await userEvent.clear(dateInput);
        await userEvent.type(dateInput, '2021-57-06');
        expect(setDate).toHaveBeenCalledWith(undefined);
    });

    test('does not do anything if onDayChange is not set', async () => {
        render(<DatePicker initialValue="2021-05-25" />);

        const dateIcon = screen.getByRole('button');

        await userEvent.click(dateIcon);
        const day = screen.getByText('21');
        await userEvent.click(day);
    });

    test('can reset selected by changing initial value', async () => {
        const Form = () => {
            const [date, setDate] = useState<Date | undefined | string>();
            const [initialDate, setInitialDate] = useState<undefined | string>('2022-06-13');
            return (
                <>
                    <DatePicker initialValue={initialDate} onDayChange={(d) => setDate(d)} />
                    <div data-testid="selected-date">
                        {typeof date === 'object' ? date?.toISOString() : date}
                    </div>
                    <button aria-label="Reset initial" onClick={() => setInitialDate('2021-07-07')}>
                        Reset initial
                    </button>
                    <button aria-label="Remove initial" onClick={() => setInitialDate(undefined)}>
                        Remove initial
                    </button>
                </>
            );
        };
        render(<Form />);

        const dateInput = screen.getByRole('textbox');
        await userEvent.clear(dateInput);
        await userEvent.type(dateInput, '2021-05-25');
        expect(screen.getByTestId('selected-date')).toHaveTextContent('2021-05-25');

        await userEvent.click(screen.getByRole('button', { name: 'Reset initial' }));
        await waitFor(() => {
            expect(screen.getByTestId('selected-date')).toHaveTextContent('2021-07-07');
        });

        await userEvent.click(screen.getByRole('button', { name: 'Remove initial' }));
        expect(screen.getByTestId('selected-date')).toHaveTextContent('');
    });

    test('input props are propagated', async () => {
        render(<DatePicker inputProps={{ className: 'custom-class', disabled: true }} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('custom-class');
        expect(input.className).toMatch(/.*disabled.*/);
    });

    test('icon props are propagated', async () => {
        render(<DatePicker iconProps={{ name: 'home', className: 'custom-class' }} />);

        const dateIcon = screen.getByRole('button');
        expect(dateIcon).toHaveClass('home');
        expect(dateIcon).toHaveClass('custom-class');
    });

    test('overlay props are propagated', async () => {
        render(
            <DatePicker
                overlayWrapperProps={
                    { className: 'custom-class', 'data-testid': 'overlay-wrapper' } as TestableDiv
                }
            />
        );

        const dateIcon = screen.getByRole('button');
        await userEvent.click(dateIcon);

        expect(screen.getByTestId('overlay-wrapper')).toHaveClass('custom-class');
    });

    test('usePopper props are propagated', async () => {
        render(<DatePicker usePopperProps={{ strategy: 'fixed', placement: 'left' }} />);

        const dateIcon = screen.getByRole('button');
        await userEvent.click(dateIcon);

        // see coverage branch
    });
});
