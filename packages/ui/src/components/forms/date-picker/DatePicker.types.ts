import { IconProps } from '../../icon/Icon.types';
import { InputProps } from '../input/Input.types';

export interface IDatePickerState {
    date?: Date;
    string?: string;
}

export interface DatePickerProps {
    /** Handler called when date is changed. Three args are passed: date, modifiers and dayPickerInput.
     * The date is a string or object, depending on `onDayChangeFormat` prop.
     * For modifiers and dayPickerInput, see
     * [`react-day-picker` documentation](https://react-day-picker.js.org/api/DayPickerInput#onDayChange).
     */
    onDayChange?: (date: Date | string | undefined, inputValue: string) => void;
    /** Format of the date passed to `onDayChange` handler */
    onDayChangeFormat?: 'date' | 'string';
    /** Date format. For all formats, see
     * [`date-fns` documentation](https://date-fns.org/v2.28.0/docs/format).
     */
    format?: string;
    placeholder?: string;
    initialValue?: string;
    /** Return partial strings, i.e. `2020-04-` */
    returnPartial?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    /** Props passed to input field */
    inputProps?: InputProps;
    /** Props passed to the Icon component */
    iconProps?: IconProps;
    /** Props passed to the overlay wrapper see
     * [documentation](https://react-day-picker.js.org/api/DayPickerInput#overlayComponent)
     */
    overlayWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Props passed to `usePopper` hook, see
     * [documentation](https://popper.js.org/react-popper/v2/hook/)
     */
    usePopperProps?: any & {
        placement?: string /** Pop up position */;
    };
}

export interface DatePickerOverlayProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    children: React.ReactNode;
    selectedDay?: Date;
    overlayProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Show the input overlay aligned on the right side of input */
    rightAlign?: boolean;
    className?: string;
}
