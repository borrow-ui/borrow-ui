import React, {
    ChangeEventHandler,
    useRef,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from 'react';
import { DayPicker } from 'react-day-picker';
import { format as formatDatefns, isValid, parse } from 'date-fns';
import { usePopper } from 'react-popper';

import { UI_PREFIX } from '../../../config';
import { a11yClickableElement } from '../../../utils/a11y';
import { Icon } from '../../icon/Icon';

import { Input } from '../input/Input';

import { DatePickerOverlayProps, DatePickerProps } from './DatePicker.types';

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

    const onDayChangeCallback = useCallback(
        (inputValue: string, newDate: Date | undefined) => {
            if (!onDayChange) return;

            if ((inputValue && newDate) || (!inputValue && !newDate)) {
                if (onDayChangeFormat === 'date') {
                    newDate && newDate.setHours(12);
                    onDayChange(newDate, inputValue);
                } else {
                    onDayChange(newDate ? formatDate(newDate, format) : undefined, inputValue);
                }
            } else if (returnPartial) {
                onDayChange(inputValue, inputValue);
            }
        },
        [onDayChange]
    );

    useEffect(() => {
        let changed = false;

        const initialValueStr = initialValue || '';
        if (inputValue !== initialValueStr) {
            setInputValue(initialValueStr);
            changed = true;
        }

        const newDate = parseDate(initialValue, format);
        if (newDate && newDate !== selected) {
            setSelected(newDate);
            changed = true;
        }
        if (changed) {
            onDayChangeCallback(initialValueStr, newDate);
        }
    }, [initialValue, format]);

    const closePopper = () => {
        setIsPopperOpen(false);
        /* istanbul ignore next */
        iconRef?.current?.focus();
    };

    const dateChange = useCallback(
        (inputValue: string) => {
            const newDate = parseDate(inputValue, format);
            setInputValue(inputValue);
            setSelected(newDate);
            onDayChangeCallback(inputValue, newDate);
        },
        [format]
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const inputValue = e.currentTarget.value;
        dateChange(inputValue);
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

    const iconClick = useMemo(() => {
        if (disabled) return {};

        const handleIconClick = () => {
            setIsPopperOpen((open) => !open);
        };
        return a11yClickableElement({ onClick: handleIconClick, role: 'button' });
    }, [disabled, selected]);

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
                    {...iconClick}
                    name="calendar_today"
                    size="small"
                    aria-label="Open date picker"
                    className={iconClass}
                    {...restIconProps}
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

function OverlayWrapper({
    children,
    className = '',
    ...props
}: DatePickerOverlayProps): JSX.Element {
    const overlayClass = `${DATEPICKER_OVERLAY} ${className}`.trim();

    return (
        <div className={overlayClass} {...props}>
            {children}
        </div>
    );
}

export function parseDate(str: string | undefined, format: string) {
    if (!str) return;
    if (str.length !== format.length) return;

    const parsed = parse(str, format, new Date());
    if (isValid(parsed)) {
        return parsed;
    }
    return;
}

export function formatDate(date: Date | undefined, format: string) {
    if (!date) return;

    return formatDatefns(date, format);
}
