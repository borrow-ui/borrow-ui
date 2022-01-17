import React, { useState, useEffect, useMemo } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { UI_PREFIX } from '../../../config';
import { FORM_INPUT_CLASS, FORM_INPUT_INVALID_CLASS, Input } from '../input/Input';

import {
    DatePickerDayPickerInputType,
    DatePickerModifiersType,
    DatePickerOverlayProps,
    DatePickerProps,
    IDatePickerState,
} from './DatePicker.types';

dayjs.extend(customParseFormat);

const DATEPICKER_OVERLAY_RIGHT_ALIGN = `${UI_PREFIX}__form__datepikcer__overlay--right-align`;

export const DatePicker = React.forwardRef<DayPickerInput, DatePickerProps>(
    (
        {
            inputProps = {},
            onDayChange,
            onDayChangeFormat = 'string',
            format = 'YYYY-MM-DD',
            placeholder,
            initialValue,
            returnPartial = true,
            disabled,
            invalid = false,
            overlayWrapperProps,
            overlayProps,
            overlayRightAlign = false,
            ...rest
        },
        ref
    ): JSX.Element => {
        const initialValueDate = useMemo(
            () => (initialValue ? parseDate(initialValue, format) : undefined),
            [initialValue, format]
        );
        const [currentDate, setCurrentDate] = useState<IDatePickerState>({
            string: '',
            date: undefined,
        });

        useEffect(() => {
            setCurrentDate({
                string: initialValue,
                date: initialValueDate,
            });
        }, [initialValue, initialValueDate]);

        const { className: inputClassName = '', inputStyle = {}, ...restInputProps } = inputProps;
        const inputInvalidClass = invalid ? FORM_INPUT_INVALID_CLASS : '';
        const inputClass = `${FORM_INPUT_CLASS} ${inputInvalidClass} ${inputClassName}`.trim();

        if (disabled) {
            inputStyle.width = inputStyle.width || 209;

            return (
                <Input
                    value={initialValue}
                    disabled={disabled}
                    className={`${inputClassName}`}
                    style={inputStyle}
                    {...restInputProps}
                />
            );
        }

        return (
            <DayPickerInput
                overlayComponent={(props: DatePickerOverlayProps) =>
                    OverlayComponent({
                        ...props,
                        overlayProps,
                        rightAlign: overlayRightAlign,
                        ...overlayWrapperProps,
                    })
                }
                inputProps={{
                    className: inputClass,
                    disabled: disabled,
                    style: inputStyle,
                    role: 'textbox',
                    ...restInputProps,
                }}
                format={format}
                placeholder={placeholder || format}
                dayPickerProps={{
                    todayButton: 'Go to Today',
                    selectedDays: currentDate.date,
                }}
                parseDate={parseDate}
                formatDate={formatDate}
                onDayChange={(
                    date: Date,
                    modifiers: DatePickerModifiersType,
                    dayPickerInput: DatePickerDayPickerInputType
                ) => {
                    // Save the input value and the dateto the internal state
                    const input = dayPickerInput.getInput();
                    setCurrentDate({
                        date,
                        string: input.value,
                    });

                    if (!onDayChange) return;

                    // if onDayChange is set, pass the value accordingly to `onDayChangeFormat`
                    if (onDayChangeFormat === 'date') {
                        if (date) date.setHours(12);
                        onDayChange(date, modifiers, dayPickerInput);
                    } else {
                        const parsed = dayjs(input.value, format, true);
                        // Check if `returnPartial` is true, otherwise do not set
                        if (returnPartial || parsed.isValid())
                            onDayChange(input.value, modifiers, dayPickerInput);
                    }
                }}
                value={currentDate.string}
                ref={ref}
                {...rest}
            />
        );
    }
);

DatePicker.displayName = 'DatePicker';

function OverlayComponent({
    children,
    classNames,
    selectedDay,
    overlayProps = {},
    rightAlign = false,
    className,
    ...props
}: DatePickerOverlayProps): JSX.Element {
    const { className: overlayPropsClass = '', ...restOverlayProps } = overlayProps;
    const rightAlignClass = rightAlign ? DATEPICKER_OVERLAY_RIGHT_ALIGN : '';
    const overlayClass = `${classNames.overlay} ${overlayPropsClass} ${rightAlignClass}`;

    return (
        <div className={`${classNames.overlayWrapper} ${className}`.trim()} {...props}>
            <div className={`${classNames.overlay} ${overlayClass}`.trim()} {...restOverlayProps}>
                {children}
            </div>
        </div>
    );
}

export function parseDate(str: string, format: string) {
    const parsed = dayjs(str, format, true);

    if (parsed.isValid()) {
        return parsed.toDate();
    }
    return undefined;
}

export function formatDate(date: Date, format: string) {
    return dayjs(date).format(format);
}
