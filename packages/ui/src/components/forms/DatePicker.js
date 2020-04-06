import React from 'react';
import PropTypes from 'prop-types';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import * as dayjs from 'dayjs';

import { FORM_INPUT_CLASS } from './Input';

export function DatePicker({
    inputProps = {},
    overlayWrapperProps,
    onDayChange,
    onDayChangeFormat = 'string',
    format = 'YYYY-MM-DD',
    placeholder,
    value,
    ...rest
}) {
    const currentValue = value ? parseDate(value, format) : undefined;

    return (
        <DayPickerInput
            overlayComponent={props => OverlayComponent({ ...props, ...overlayWrapperProps })}
            inputProps={{
                ...inputProps,
                className: `${inputProps.className || ''} ${FORM_INPUT_CLASS}`,
            }}
            format={format}
            placeholder={placeholder || format}
            todayButton="Go to Today"
            parseDate={parseDate}
            formatDate={formatDate}
            onDayChange={d => {
                if (!onDayChange) return;

                const ret = onDayChangeFormat === 'date' ? d : formatDate(d, format);
                onDayChange(ret);
            }}
            selectedDays={currentValue}
            value={currentValue}
            {...rest}
        />
    );
}

DatePicker.propTypes = {
    inputProps: PropTypes.object,
    overlayWrapperProps: PropTypes.object,
    onDayChange: PropTypes.func,
    onDayChangeFormat: PropTypes.oneOf(['date', 'string']),
    format: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
};

function OverlayComponent({ children, classNames, selectedDay, ...props }) {
    return (
        <div className={classNames.overlayWrapper} {...props}>
            <div className={classNames.overlay}>{children}</div>
        </div>
    );
}

OverlayComponent.propTypes = {
    classNames: PropTypes.object.isRequired,
    selectedDay: PropTypes.instanceOf(Date),
    children: PropTypes.node.isRequired,
};

function parseDate(str, format) {
    const parsed = dayjs(str, format).toDate();

    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format) {
    return dayjs(date).format(format);
}
