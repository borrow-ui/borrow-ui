import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { UI_PREFIX } from '../../../config';
import { FORM_INPUT_CLASS, FORM_INPUT_INVALID_CLASS, Input } from '../input/Input';

dayjs.extend(customParseFormat);

const DATEPICKER_OVERLAY_RIGHT_ALIGN = `${UI_PREFIX}__form__datepikcer__overlay--right-align`;

export function DatePicker({
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
}) {
    const initialValueDate = useMemo(
        () => (initialValue ? parseDate(initialValue, format) : undefined),
        [initialValue, format]
    );
    const [currentDate, setCurrentDate] = useState({ string: '', date: undefined });

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
            overlayComponent={(props) =>
                OverlayComponent({
                    ...props,
                    overlayProps,
                    rightAlign: overlayRightAlign,
                    ...overlayWrapperProps,
                })
            }
            inputProps={{
                className: inputClass,
                style: inputStyle,
                role: 'textbox',
                ...restInputProps,
            }}
            format={format}
            placeholder={placeholder || format}
            todayButton="Go to Today"
            parseDate={parseDate}
            formatDate={formatDate}
            onDayChange={(date, modifiers, dayPickerInput) => {
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
            selectedDays={currentDate.date}
            disabled={disabled}
            value={currentDate.string}
            {...rest}
        />
    );
}

DatePicker.propTypes = {
    /** Handler called when date is changed. Three args are passed: date, modifiers and dayPickerInput.
     * The date is a string or object, depending on `onDayChangeFormat` prop.
     * For modifiers and dayPickerInput, see
     * [`react-day-picker` documentation](https://react-day-picker.js.org/api/DayPickerInput#onDayChange).
     */
    onDayChange: PropTypes.func,
    /** Format of the date passed to `onDayChange` handler */
    onDayChangeFormat: PropTypes.oneOf(['date', 'string']),
    /** Date format. For all formats, see
     * [`dayjs` documentation](https://day.js.org/docs/en/parse/string-format).
     */
    format: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    /** Return partial strings, i.e. `2020-04-` */
    returnPartial: PropTypes.bool,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    /** Props passed to input field */
    inputProps: PropTypes.object,
    /** Props passed to the overlay wrapper see
     * [documentation](https://react-day-picker.js.org/api/DayPickerInput#overlayComponent)
     */
    overlayWrapperProps: PropTypes.object,
    /** Props passed to the overlay */
    overlayProps: PropTypes.object,
    /** Align the overlay on the right side of the input */
    overlayRightAlign: PropTypes.bool,
};

function OverlayComponent({
    children,
    classNames,
    selectedDay,
    overlayProps = {},
    rightAlign = false,
    className,
    ...props
}) {
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

OverlayComponent.propTypes = {
    classNames: PropTypes.object.isRequired,
    selectedDay: PropTypes.instanceOf(Date),
    children: PropTypes.node.isRequired,
    overlayProps: PropTypes.object,
    /** Show the input overlay aligned on the right side of input */
    rightAlign: PropTypes.bool,
    className: PropTypes.string,
};

export function parseDate(str, format) {
    const parsed = dayjs(str, format, true);

    if (parsed.isValid()) {
        return parsed.toDate();
    }
    return undefined;
}

export function formatDate(date, format) {
    return dayjs(date).format(format);
}
