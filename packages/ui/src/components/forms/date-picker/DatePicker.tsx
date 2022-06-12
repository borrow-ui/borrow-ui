import React, { ChangeEventHandler, useRef, useState, useEffect, useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import { format as formatDatefns, isValid, parse } from 'date-fns';
import { usePopper } from 'react-popper';

import { UI_PREFIX } from '../../../config';
import { FORM_INPUT_CLASS, FORM_INPUT_INVALID_CLASS, Input } from '../input/Input';

import { DatePickerOverlayProps, DatePickerProps } from './DatePicker.types';
import { Icon } from '../../icon/Icon';

const DATEPICKER = `${UI_PREFIX}__form__datepicker`;
const DATEPICKER_ICON = `${UI_PREFIX}__form__datepicker__icon`;
const DATEPICKER_ICON_DISABLED = `${UI_PREFIX}__form__datepicker__icon--disabled`;
const DATEPICKER_INPUT = `${UI_PREFIX}__form__datepicker__input`;
const DATEPICKER_OVERLAY = `${UI_PREFIX}__form__datepicker__overlay`;

export function DatePicker({
    onDayChange,
    onDayChangeFormat = 'string',
    returnPartial = true,
    initialValue,
    format = 'yyyy-MM-dd',
    inputProps = {},
    iconProps = {},
    overlayWrapperProps = {},
    usePopperProps = {},
    disabled,
    invalid,
}: DatePickerProps) {
    const [selected, setSelected] = useState<Date>();
    const [inputValue, setInputValue] = useState<string>(initialValue || '');
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const popperRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLButtonElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

    const { placement = 'bottom-start', ...restUsePopperProps } = usePopperProps;

    const popper = usePopper(popperRef.current, popperElement, {
        placement,
        ...restUsePopperProps,
    });

    useEffect(() => {
        const initialValueStr = initialValue || '';
        if (inputValue !== initialValueStr) {
            setInputValue(initialValueStr);
        }
    }, [initialValue]);

    const closePopper = () => {
        setIsPopperOpen(false);
        iconRef?.current?.focus();
    };

    const dateChange = useCallback(
        (inputValue: string) => {
            const newDate = parseDate(inputValue, format);
            setInputValue(inputValue);
            setSelected(newDate);
            if (!onDayChange) return;

            if ((inputValue && newDate) || (!inputValue && !newDate)) {
                if (onDayChangeFormat === 'date') {
                    onDayChange(newDate, inputValue);
                } else {
                    onDayChange(newDate ? formatDate(newDate, format) : undefined, inputValue);
                }
            } else if (returnPartial) {
                onDayChange(inputValue, inputValue);
            }
        },
        [format]
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const inputValue = e.currentTarget.value;
        dateChange(inputValue);
    };

    const handleIconClick = () => {
        setIsPopperOpen((open) => !open);
    };

    const handleDaySelect = (date: Date | undefined) => {
        dateChange(formatDate(date, format) || '');
        if (date) {
            closePopper();
        }
    };

    const { className: inputClassName = '', ...restInputProps } = inputProps;
    const inputClass = `${DATEPICKER_INPUT} ${inputClassName}`.trim();

    const { className: iconClassName = '', ...restIconProps } = iconProps;
    const iconDisabledClass = disabled ? DATEPICKER_ICON_DISABLED : '';
    const iconClass = `${DATEPICKER_ICON} ${iconDisabledClass} ${iconClassName}`.trim();
    return (
        <>
            <div ref={popperRef} className={DATEPICKER}>
                <Input
                    invalid={invalid}
                    disabled={disabled}
                    value={inputValue}
                    onChange={handleInputChange}
                    className={inputClass}
                    {...restInputProps}
                />
                <Icon
                    ref={iconRef}
                    onClick={!disabled ? handleIconClick : undefined}
                    name="calendar_today"
                    size="small"
                    className={iconClass}
                />
            </div>
            {isPopperOpen && (
                <div
                    tabIndex={-1}
                    style={{
                        ...popper.styles.popper,
                        zIndex: 1,
                    }}
                    {...popper.attributes.popper}
                    ref={setPopperElement}
                    role="dialog"
                >
                    <OverlayWrapper {...overlayWrapperProps}>
                        <DayPicker
                            initialFocus={isPopperOpen}
                            mode="single"
                            defaultMonth={selected}
                            selected={selected}
                            onSelect={handleDaySelect}
                        />
                    </OverlayWrapper>
                </div>
            )}
        </>
    );
}

function OverlayWrapper({ children, className, ...props }: DatePickerOverlayProps): JSX.Element {
    const overlayClass = `${DATEPICKER_OVERLAY} ${className}`.trim();

    return (
        <div className={overlayClass} {...props}>
            {children}
        </div>
    );
}

export function parseDate(str: string, format: string) {
    const parsed = parse(str, format, new Date());
    if (isValid(parsed)) {
        return parsed;
    }
    return undefined;
}

export function formatDate(date: Date | undefined, format: string) {
    if (!date) return;
    return formatDatefns(date, format);
}
